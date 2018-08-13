import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID'
const GET_EVENT_BY_NAME = 'GET_EVENT_BY_NAME'

const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT_ALL = 'UPDATE_EVENT_ALL'
const UPDATE_EVENT_STATUS = 'UPDATE_EVENT_STATUS'
const UPDATE_EVENT_DATE = 'UPDATE_EVENT_DATE'

/**
 * ACTION CREATORS
 */
const getEvents = events => ({type: GET_EVENTS, events})
const addEvent = event => ({type: ADD_EVENT, event})
//Update all fields on event
const updateEventAll = event => ({
  type: UPDATE_EVENT_STATUS,
  event
})
//Update only an event's status
const updateEventStatus = event => ({
  type: UPDATE_EVENT_STATUS,
  event
})
//Update only an event's date
const updateEventDate = event => ({
  type: UPDATE_EVENT_DATE,
  event
})

/**
 * THUNK CREATORS
 */
export const postEvent = event => async dispatch => {
  const {data: newEvent} = await axios.get('/api/events', event)
  dispatch(addEvent(newEvent))
}
export const fetchAllEvents = () => async dispatch => {
  const {data: events} = await axios.get('/api/events')
  dispatch(getEvents(events))
}

//fetch an event by name
export const fetchEventByName = eventName => async dispatch => {
  const {data: event} = await axios.get(`/api/events/name/${eventName}`)
  dispatch(getEvents(event))
}
//fetch an event by id
export const fetchByEvents = eventId => async dispatch => {
  const {data: event} = await axios.get(`/api/events/${eventId}`)
  dispatch(getEvents(event))
}
//Put Request for all fields on event
export const changeEventAllFields = (
  eventSubmission,
  eventId
) => async dispatch => {
  const {data: updatedEvent} = await axios.put(
    `/api/events/${eventId}`,
    eventSubmission
  )
  dispatch(updateEventAll(updatedEvent))
}

//Put request for An Event's Status
export const changeEventStatus = (newStatus, eventId) => async dispatch => {
  const {data: updatedEvent} = await axios.put(
    `/api/events/${eventId}`,
    newStatus
  )
  dispatch(updateEventStatus(updatedEvent))
}
//Put request for An Event's Date
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
const defaultEvents = []

/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    case GET_EVENT_BY_ID:
      return [action.event]
    case GET_EVENT_BY_NAME:
      return [action.event]
    case ADD_EVENT:
      return [...state, action.event]
    case UPDATE_EVENT_ALL:
      return state.map(event => {
        return event.id === action.event.id ? action.event : event
      })
    case UPDATE_EVENT_STATUS:
      return state.map(event => {
        return event.id === action.event.id ? action.event : event
      })
    case UPDATE_EVENT_DATE:
      return state.map(event => {
        return event.id === action.event.id ? action.event : event
      })
    default:
      return state
  }
}
