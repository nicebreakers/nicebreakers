import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import player from './player'
import events from './event'
import interaction from './interaction'
import {reducer as formReducer} from 'redux-form'

import prompt from './prompt'

const reducer = combineReducers({
  interaction,
  user,
  events,
  player,
  prompt,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './player'
export * from './event'
export * from './prompt'
export * from './interaction'
