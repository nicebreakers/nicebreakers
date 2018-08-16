import axios from 'axios'
import history from '../history'
import socket from '../socket'
import {gotInteractions} from './interaction'
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

/**
 * ACTION CREATORS
 */
export const updateEventStatus = event => ({type: UPDATE_EVENT_STATUS, event})
const getEvents = events => ({type: GET_EVENTS, events})
const addEvent = event => ({type: ADD_EVENT, event})
const updateEventAll = event => ({type: UPDATE_EVENT_ALL, event})
const updateEventDate = event => ({type: UPDATE_EVENT_DATE, event})

/**
 * SOCKET THUNK CREATORS
 */

export const sendGameInitEvent = eventId => dispatch => {
  axios
    .put(`/api/events/${eventId}/status`, {status: 'in_progress'})
    .then(({data}) => dispatch(updateEventStatus(data)))
    // .then(() => axios.post(`/api/events/${eventId}/interactions/`))
    .then(({data}) => dispatch(gotInteractions(eventId, data)))
    .then(() => {
      socket.emit(START_EVENT, {eventId})
      console.log(`Emitted ${START_EVENT} for event ${eventId}`)
    })
    .catch(err => console.error(err))
}

export const sendEndGameEvent = eventId => dispatch => {
  axios
    .put(`/api/events/${eventId}/status`, {status: 'done'})
    .then(({data}) => dispatch(updateEventStatus(data)))
    .then(() => {
      socket.emit(END_EVENT, {eventId})
      console.log(`Emitted ${END_EVENT} for event ${eventId}`)
    })
    .catch(err => console.error(err))
}

/**
 * NON-SOCKET THUNK CREATORS
 */
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
export const changeEventDate = (newDate, eventId) => async dispatch => {
  const {data: updatedEvent} = await axios.put(
    `/api/events/${eventId}`,
    newDate
  )
  dispatch(updateEventDate(updatedEvent))
}

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
        byId: {
          ...state.byId,
          [action.event.id]: action.event
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
