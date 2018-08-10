import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon, {spy} from 'sinon'
import {CreateGamePage} from './adminCreateGame'
import history from '../../history'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('CreateGamePage', () => {
  let createForm
  let submitSpy = sinon.spy()

  beforeEach(() => {
    createForm = shallow(
      <CreateGamePage history={history} submitParticipants={submitSpy} />
    )
  })
  it('dispatches a formSubmission on form Submit', () => {
    const form = createForm.find('form')
    console.log('Form', form)
    const fakeEvent = {preventDefault: () => console.log('preventDefault')}
    form.simulate('submit', fakeEvent)
    expect(submitSpy.called).to.be.true
  })
})
