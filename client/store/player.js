/**
 * ACTION TYPES
 */
export const GET_PLAYERS = 'GET_PLAYERS'
export const ADD_PLAYER = 'ADD_PLAYER'
export const REMOVE_PLAYER = 'REMOVE_PLAYER'

/**
 * ACTION CREATORS
 */
export const getPlayers = players => ({type: GET_PLAYERS, players})
export const addPlayer = player => ({type: ADD_PLAYER, player})
export const removePlayer = playerId => ({type: REMOVE_PLAYER, playerId})

//global acting as temporary db seed
let db = ["email1@email.com", "email2@email.com", "email3@email.com", "email4@email.com", "email5@email.com"]
/**
 * THUNK CREATORS
 */
export const deletePlayer = playerId => dispatch => {
	//using playerId as the email name since the temp db doesn't have an id
	dispatch(removePlayer(playerId));
}
export const createPlayer = player => dispatch => {
	const {email} = player
	dispatch(addPlayer(email))
}
export const fetchAllPlayers = () => dispatch => {
	dispatch(getPlayers(db))
}
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
			return action.players
		case ADD_PLAYER:
			return [...state, action.player]
		case REMOVE_PLAYER:
			// return state.filter(singlePlayer => singlePlayer.id !== action.playerId)
			return state.filter(singlePlayer => singlePlayer !== action.playerId)
		default:
			return state
	}
}
