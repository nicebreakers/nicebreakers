import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PROMPTS = 'GET_ALL_PROMPTS'
const ADD_PROMPT = 'ADD_PROMPT'
const REMOVE_PROMPT = 'REMOVE_PROMPT'

/**
 * ACTION CREATORS
 */
const getAllPrompts = prompts => ({
  type: GET_ALL_PROMPTS,
  prompts
})
const addPrompt = prompt => ({
  type: ADD_PROMPT,
  prompt
})
const removePrompt = promptId => ({
  type: REMOVE_PROMPT,
  promptId
})

/**
 * THUNK CREATORS
 */
export const fetchAllPrompts = () => async dispatch => {
  const res = await axios.get('/api/prompts/')
  dispatch(getAllPrompts(res.data))
}
export const insertPrompt = newPrompt => async dispatch => {
  const res = await axios.post('/api/prompts/', newPrompt)
  dispatch(addPrompt(res.data))
}
export const deletePrompt = promptId => async dispatch => {
  const res = await axios.delete(`/api/prompts/${promptId}`)
  if (res.data > 0) {
    dispatch(removePrompt(promptId))
  }
}

/**
 * INITIAL STATE
 */
const defaultPrompt = {
  byId: {}
}

/**
 * REDUCER
 */
export default function(state = defaultPrompt, action) {
  switch (action.type) {
    case GET_ALL_PROMPTS:
      return {
        byId: action.prompts.reduce((result, prompt) => {
          return {...result, [result[prompt.id]]: prompt}
        }, {})
      }
    case ADD_PROMPT:
      return {
        byId: {...state.byId, [action.prompt.id]: action.prompt}
      }
    case REMOVE_PROMPT: {
      const ids = state.byId
      delete ids[action.promptId]
      return {...ids}
    }
    default:
      return state
  }
}
