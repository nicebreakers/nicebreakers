import axios from 'axios'
/**
 * ACTION TYPES
 */
export const GET_USERS_AT_EVENT = 'GET_USERS_AT_EVENT'
export const ADD_USER_TO_EVENT = 'ADD_USER_TO_EVENT'
export const REMOVE_USER_FROM_EVENT = 'REMOVE_PLAYER'

/**
 * ACTION CREATORS
 */
const gotUsersForEvent = users => ({type: GET_USERS_AT_EVENT, users})
const addedUser = user => ({type: ADD_USER_TO_EVENT, user})
const removedUser = userId => ({type: REMOVE_USER_FROM_EVENT, userId})

/**
 * THUNK CREATORS
 */

export const fetchPlayersByEventId = eventId => async dispatch => {
  const {data: players} = await axios.get(`/api/users/atEvents/${eventId}`)
  dispatch(gotUsersForEvent(players))
}

export const addUserToEvent = (userEmail, eventId) => async dispatch => {
  const {data: user} = await axios.put('/api/users/atEvents', {
    userEmail,
    eventId
  })
  dispatch(addedUser(user))
}

/**
 * INITIAL STATE
 */
const defaultUsersAtEvent = []

/**
 * REDUCER
 */
export default function(state = defaultUsersAtEvent, action) {
  switch (action.type) {
    case GET_USERS_AT_EVENT:
      return action.users.Users
    case ADD_USER_TO_EVENT: {
      return [...state, action.user]
    }

    // case REMOVE_PLAYER:
    //   // return state.filter(singlePlayer => singlePlayer.id !== action.playerId)
    //   return state.filter(singlePlayer => singlePlayer !== action.playerId)
    default:
      return state
  }
}
