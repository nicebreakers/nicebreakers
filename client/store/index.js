import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import player from './player'
import prompt from './prompt'
import event from './event'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({user, event, player, prompt, form: formReducer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './player'
export * from './prompt'
