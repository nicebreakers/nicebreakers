
import React from 'react'

import {connect} from 'react-redux'
import EventForm from './game-forms/EventForm'
import {postEvent} from '../store/event'

export const EventFormPage = props => (
  <div>
    <h1> Create Event </h1>
    <EventForm onSubmit={props.onSubmit} />
  </div>
)
const mapDispatchToProps = dispatch => ({
  onSubmit: newEvent => dispatch(postEvent(newEvent))
})
export default connect(null, mapDispatchToProps)(EventFormPage)
