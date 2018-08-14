import {expect} from 'chai'
import {fetchAllPrompts, insertPrompt, deletePrompt} from '../store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios
  const fakePrompt = {question: 'fake question'}

  const initialState = {prompt: [fakePrompt]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  //thunk testing not working
  // describe('fetchAllPrompts', () => {
  // 	it('eventually dispatches GET_ALL_PROMPTS action', async () => {
  // 		mockAxios.onGet('/api/prompts').replyOnce(200, [fakePrompt])
  // 		await store.dispatch(fetchAllPrompts())
  // 		const actions = store.getActions();
  // 		expect(actions[0].type).to.be.equal('GET_ALL_PROMPTS')
  // 		expect(actions[0].prompt[0]).to.be.deep.equal(fakePrompt)
  // 	})
  // })
})
