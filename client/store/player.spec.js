/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import * as actions from '../store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

/**
 * For future thunk testing
 */
describe('player thunk creators', () => {
	let store, mockAxios;

	const initialState = {player: []}

	beforeEach(() => {
		mockAxios = new MockAdapter(axios)
		store = mockStore(initialState)
	})

	afterEach(() => {
    mockAxios.restore()
    store.clearActions()
	})

})

describe('player actions', () => {
	it('getPlayers should create an action to get all the players', () => {
		const players = ["test@email.com", "anotherTest@email.com"]
		const expectedAction = {
			type: actions.GET_PLAYERS,
			players
		}
		expect(actions.getPlayers(players)).to.be.deep.equal(expectedAction)
	})

	it('addPlayer should create an action to add a player', () => {
		const player = "test@email.com"
		const expectedAction = {
			type: actions.ADD_PLAYER,
			player
		}
		expect(actions.addPlayer(player)).to.be.deep.equal(expectedAction)
	})

	it('removePlayer should create an action to remove a player', () => {
		//right now there is no playerId, so just the email string is used
		const playerId = "anotherTest@email.com"
		const expectedAction = {
			type: actions.REMOVE_PLAYER,
			playerId
		}
		expect(actions.removePlayer(playerId)).to.be.deep.equal(expectedAction)
	})
})
