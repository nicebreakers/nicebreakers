/**
 * ACTION TYPES
 */
const GET_PLAYERS = 'GET_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

/**
 * ACTION CREATORS
 */
const getPlayers = () => ({type: GET_PLAYERS})
const addPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = playerId => ({type: REMOVE_PLAYER, playerId})

/**
 * THUNK CREATORS
 */

/**
 * INITIAL STATE
 */
const defaultPlayers = []

/**
 * REDUCER
 */
export default function(state = defaultPlayers, action) {
	switch(action.type) {
		case GET_PLAYERS:
			return state
		case ADD_PLAYER:
			return [...state, action.player]
		case REMOVE_PLAYER:
			return state.filter(singlePlayer => singlePlayer.id !== action.playerId)
		default:
			return state
	}
}
