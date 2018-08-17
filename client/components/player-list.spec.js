import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlayerList from './player-list'
import PlayerSingle from './player-single'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PlayerList', () => {
  let wrapper
  const testPlayers = [
    'test@email.com',
    'anotherTest@email.com',
    'oneMore@email.com'
  ]

  beforeEach(() => {
    // playerList = shallow(<PlayerList players={testPlayers} />)
    wrapper = shallow(<PlayerList participants={testPlayers} />)

    //need to add test
  })
})
