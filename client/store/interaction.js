import axios from 'axios'
import {
  getShapeById,
  getAnimalById,
  getCarById
} from '../components/utility-components/pictureHashLookup'
import {updateEventStatus} from '../store'

/**
 * ACTION TYPES
 */
const GOT_INTERACTIONS = 'GET_INTERACTIONS'
const GOT_NEXT_INTERACTION = 'GOT_NEXT_INTERACTION'
const UPDATE_CURRENT_INTERACTION = 'UPDATE_CURRENT_INTERACTION'

/**
 * ACTION CREATORS
 */
export const gotInteractions = (eventId, interactions) => ({
  type: GOT_INTERACTIONS,
  interactions: interactions
})

const gotNextInteraction = interaction => ({
  type: GOT_NEXT_INTERACTION,
  interaction
})

const updateCurrentInteraction = interaction => ({
  type: UPDATE_CURRENT_INTERACTION,
  interaction
})

/**
 * SOCKET THUNK CREATORS
 */

/**
 * NON-SOCKET THUNK CREATORS
 */

// getInteractions thunk goes here.

/**
 * INITIAL STATE
 */
const defaultInteractions = {
  byId: {},
  currentInteraction: {}
}

/**
 * REDUCER
 */

export const getRoundInteraction = (
  eventId,
  round,
  updatedEvent
) => dispatch => {
  axios
    .get(`/api/events/${eventId}/round/${round}`)
    .then(({data}) => dispatch(gotNextInteraction(data)))
    .then(() => dispatch(updateEventStatus({...updatedEvent})))
    .catch(error => console.error(error))
}

export const updateInteractionData = interaction => dispatch => {
  axios
    .put(`/api/interactions/${interaction.id}`, interaction)
    .then(({data: updatedInteraction}) => {
      dispatch(updateCurrentInteraction(updatedInteraction))
      M.toast({
        html:
          'Submitted! \nPlease wait for instruction\nThe next round will begin soon!',
        displayLength: 10000,
        classes: 'green'
      })
    })
    .catch(err => console.error(err))
}

export default function(state = defaultInteractions, action) {
  switch (action.type) {
    case UPDATE_CURRENT_INTERACTION:
    case GOT_NEXT_INTERACTION:
      return {
        ...state,
        currentInteraction: {...action.interaction}
      }
    case GOT_INTERACTIONS:
      return {
        ...state,
        byId: action.interactions.reduce((nextById, interaction) => {
          return {...nextById, [interaction.id]: interaction}
        }, {})
      }
    default:
      return state
  }
}

/*
 *  SELECTORS
 */
export const getPrompt = state => {
  const {promptId} = state.interaction.currentInteraction
  if (promptId) return state.prompt.byId[promptId].question
  else return 'Loading error, please refresh.'
}

export const getDisplayShape = state => {
  //if there is an interaction currently in store, use the id to look up a pic in the tables
  let photoUrl = null
  if (state.interaction.currentInteraction.id) {
    //extract the id and the number of Participants in the Event
    const interactionId = state.interaction.currentInteraction.id
    // const numParticipants = Object.values(state.interaction.byId).length
    //Interchange Shapes and Animals from Round to Round
    if (state.interaction.currentInteraction.round % 3 === 0)
      photoUrl = getCarById(interactionId, 4)
    else if (state.interaction.currentInteraction.round % 3 === 1)
      photoUrl = getShapeById(interactionId, 4)
    else {
      photoUrl = getAnimalById(interactionId, 4)
    }
  }
  return photoUrl
}
