import axios from 'axios'

const GET_ALL_PARTICIPANTS = 'GET_ALL_PARTICIPANTS'

const gotAllParticipants = participants => ({
  type: GET_ALL_PARTICIPANTS,
  participants
})

export const getAllParticipants = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/participants`)
    dispatch(gotAllParticipants(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PARTICIPANTS:
      return action.participants
    default:
      return state
  }
}

export const getParticipants = state => {
  const parts = state.participant
  return parts ? parts : {}
}
