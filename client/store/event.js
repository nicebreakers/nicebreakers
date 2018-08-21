import axios from 'axios'
import history from '../history'
import socket from '../socket'
import {gotInteractions} from './interaction'
import {createHtmlEmails} from '../emails/report'
/*
* SOCKET EVENT TYPES
*/
import {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  ROOM,
  EVENT_PREFIX,
  END_EVENT
} from '../../server/socket/events'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT_ALL = 'UPDATE_EVENT_ALL'
const UPDATE_EVENT_STATUS = 'UPDATE_EVENT_STATUS'
const UPDATE_EVENT_DATE = 'UPDATE_EVENT_DATE'
const RESET_ROUNDS = 'RESET_ROUNDS'
const UPDATE_ROUND = 'UPDATE_ROUND'
const SEND_EVENT_EMAIL = 'SEND_EVENT_EMAIL'

/**
 * ACTION CREATORS
 */
export const updateEventStatus = event => ({type: UPDATE_EVENT_STATUS, event})
const getEvents = events => ({type: GET_EVENTS, events})
const addEvent = event => ({type: ADD_EVENT, event})
const updateEventAll = event => ({type: UPDATE_EVENT_ALL, event})
// const updateEventDate = event => ({type: UPDATE_EVENT_DATE, event})
const eventEmailSent = message => ({type: SEND_EVENT_EMAIL, message})
export const resetRound = () => ({type: RESET_ROUNDS})
const updateRound = (eventId, {round}) => ({type: UPDATE_ROUND, eventId, round})

/**
 * SOCKET THUNK CREATORS
 */

export const sendGameInitEvent = eventId => dispatch => {
  axios
    .put(`/api/events/${eventId}/status`, {status: 'in_progress'})
    .then(({data}) => dispatch(updateEventStatus(data)))
    .then(() => axios.post(`/api/events/${eventId}/interactions/`))
    .then(({data}) => dispatch(gotInteractions(eventId, data)))
    .then(() => axios.get(`/api/events/${eventId}/round`))
    .then(({data}) => dispatch(updateRound(eventId, data)))
    .then(() => {
      socket.emit(START_EVENT, {eventId})
      console.log(`Emitted ${START_EVENT} for event ${eventId}`)
    })
    .then(() => dispatch(resetRound))
    .catch(err => console.error(err))
}

export const sendEndGameEvent = eventId => dispatch => {
  axios
    .put(`/api/events/${eventId}/status`, {status: 'done'})
    .then(({data}) => dispatch(updateEventStatus(data)))
    .then(() => {
      socket.emit(END_EVENT, {eventId})
      console.log(`Emitted ${END_EVENT} for event ${eventId}`)
      history.push(`/events/${eventId}`)
    })
    .catch(err => console.error(err))
}

export const leaderRequestNextRound = (eventId, round) => dispatch => {
  axios
    .put(`/api/events/${eventId}/round`, {updatedRound: round})
    .then(({data}) => dispatch(updateRound(eventId, data)))
    .then(() => {
      socket.emit(REQUEST_NEXT_ROUND, {eventId, round})
      console.log(
        `Emitted ${REQUEST_NEXT_ROUND} for event ${eventId} with round ${round}`
      )
    })
}

/**
 * NON-SOCKET THUNK CREATORS
 */
export const sendEventEmail = eventId => async dispatch => {
  try {
    const {data: userReports} = await axios.get(
      `/api/interactions/event/${eventId}`
    )
    axios
      .post(`/api/mailer`, {eventId, messages: createHtmlEmails(userReports)})
      .then(() => dispatch(eventEmailSent()))
  } catch (err) {
    console.error(err)
  }
}

export const postEvent = event => async dispatch => {
  try {
    const {data: newEvent} = await axios.post('/api/events', event)
    dispatch(addEvent(newEvent))
    history.push('/home')
  } catch (error) {
    console.log(error)
  }
}
export const fetchAllEvents = () => async dispatch => {
  try {
    const {data: events} = await axios.get('/api/events')
    dispatch(getEvents(events))
  } catch (error) {
    console.log(error)
  }
}

export const changeEventAllFields = eventSubmission => async dispatch => {
  const eventId = eventSubmission.id
  const {data: updatedEvent} = await axios.put(
    `/api/events/${eventId}`,
    eventSubmission
  )
  dispatch(updateEventAll(updatedEvent))
  M.toast({html: 'Event Updated!', classes: 'green'})
  history.push('/home')
}

export const changeEventStatus = (status, eventId) => async dispatch => {
  const {data: updatedEvent} = await axios.put(
    `/api/events/${eventId}/status`,
    {
      status
    }
  )
  dispatch(updateEventStatus(updatedEvent))
  history.push('/home')
}
// export const changeEventDate = (newDate, eventId) => async dispatch => {
//   const {data: updatedEvent} = await axios.put(
//     `/api/events/${eventId}`,
//     newDate
//   )
//   dispatch(updateEventDate(updatedEvent))
// }

/**
 * INITIAL STATE
 */
const defaultEvents = {byId: {}}
/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        byId: action.events.reduce((result, event) => {
          result[event.id] = event
          return result
        }, {})
      }
    case ADD_EVENT: // intentional fallthrough
    case UPDATE_EVENT_ALL: // intentional fallthrough
    case UPDATE_EVENT_STATUS: // intentional fallthrough
    case UPDATE_EVENT_DATE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.event.id]: action.event
        }
      }
    case RESET_ROUNDS: {
      return {
        byId: {...state.byId},
        round: 1
      }
    }
    case UPDATE_ROUND: {
      return {
        byId: {
          ...state.byId,
          [action.eventId]: {...state.byId[action.eventId], round: action.round}
        }
      }
    }
    default:
      return state
  }
}

/*
 *  SELECTORS
 */
export const getEventsByStatus = (allState, status) => {
  return (
    Object.values(allState.events.byId).filter(
      event => event.status === status
    ) || []
  )
}

export const isEventPending = (state, eventId) => {
  const event = state.events.byId[eventId]
  return event ? event.status === 'pending' : false
}

export const isEventDone = (state, eventId) => {
  const event = state.events.byId[eventId]
  return event ? event.status === 'done' : false
}

export const getRound = (state, eventId) => {
  const event = state.events.byId[eventId]
  return event ? event.round : 1
}
