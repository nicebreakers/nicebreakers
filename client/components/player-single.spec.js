/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlayerSingle from './player-single'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PlayerSingle', () => {
  let playerSingle

  beforeEach(() => {
    playerSingle = shallow(<PlayerSingle data="cody@email.com" />)
  })

  it('renders the data in an h3', () => {
    expect(playerSingle.find('h3').text()).to.be.equal('cody@email.com')
  })
})
