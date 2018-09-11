import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlayerList from './player-list'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('PlayerList', () => {
  let wrapper
  const testPlayers = [
    'test@email.com',
    'anotherTest@email.com',
    'oneMore@email.com'
  ]

  beforeEach(() => {
    wrapper = shallow(<PlayerList participants={testPlayers} />)
    // TODO: Add test
  })
})
