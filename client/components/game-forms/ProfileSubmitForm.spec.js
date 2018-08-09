import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon, {spy} from 'sinon'
import {ProfileSubmitForm} from './ProfileSubmitForm'
import history from '../../history'
const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('ProfileSubmitForm', () => {
  let picForm
  let submitSpy = sinon.spy()

  beforeEach(() => {
    picForm = shallow(
      <ProfileSubmitForm history={history} submitProfile={submitSpy} />
    )
  })
  it('dispatches a formSubmission on form Submit', () => {
    const form = picForm.find('form')
    console.log('Form', form)
    const fakeEvent = {preventDefault: () => console.log('preventDefault')}
    form.simulate('submit', fakeEvent)
    expect(submitSpy.called).to.be.true
  })
})
