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
const removedUser = user => ({type: REMOVE_USER_FROM_EVENT, user})

/**
 * THUNK CREATORS
 */

export const fetchPlayersByEventId = eventId => async dispatch => {
  try {
    const {data: players} = await axios.get(`/api/users/atEvents/${eventId}`)
    dispatch(gotUsersForEvent(players))
  } catch (err) {
    console.log(err)
  }
}

export const addUserToEvent = (userEmail, eventId) => async dispatch => {
  try {
    const {data: user} = await axios.put('/api/users/atEvents', {
      userEmail,
      eventId
    })
    dispatch(addedUser(user))
  } catch (err) {
    console.log(err)
  }
}

export const removeUserFromEvent = (user, eventId) => async dispatch => {
  try {
    const {data: deletedUser} = await axios.delete(
      `/api/users/atEvents/${eventId}`,
      {data: {user}}
    )
    dispatch(removedUser(deletedUser))
  } catch (err) {
    console.log(err)
  }
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
      return action.users
    case ADD_USER_TO_EVENT: {
      return [...state, action.user]
    }
    case REMOVE_USER_FROM_EVENT: {
      return state.filter(user => {
        return user.id !== action.user.id
      })
    }

    // case REMOVE_PLAYER:
    //   // return state.filter(singlePlayer => singlePlayer.id !== action.playerId)
    //   return state.filter(singlePlayer => singlePlayer !== action.playerId)
    default:
      return state
  }
}
