import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PARTICIPANTS = 'GET_PARTICIPANTS'
const ADD_PARTICIPANT = 'ADD_PARTICIPANT'
const REMOVE_PARTICIPANT = 'REMOVE_PARTICIPANT'

/**
 * INITIAL STATE
 */
const defaultParticipants = []

/**
 * ACTION CREATORS
 */
const getParticipants = participants => ({type: GET_PARTICIPANTS, participants})
const addParticipant = participant => ({type: ADD_PARTICIPANT, participant})
const removeParticipant = id => ({type: REMOVE_PARTICIPANT})

/**
 * THUNK CREATORS
 */
export const fetchParticipants = () => async dispatch => {
  try {
    await axios.get('/api/participants')
    dispatch(getParticipants())
    // history.push('/?????')
  } catch (err) {
    console.error(err)
  }
}

export const postParticipants = newParticipant => async dispatch => {
  try {
    await axios.post('/api/participants')
    dispatch(getParticipants())
    // history.push('/?????')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(participantsState = defaultParticipants, action) {
  switch (action.type) {
    case GET_PARTICIPANTS:
      return action.participants
    case REMOVE_PARTICIPANT: {
      const filtered = participantsState.filter(
        participant => participant.id !== action.id
      )
      return filtered
    }
    case ADD_PARTICIPANT:
      return [...participantsState, action.participant]
    default:
      return participantsState
  }
}
