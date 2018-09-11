import React from 'react'
import {connect} from 'react-redux'

import EventForm from './forms/EventForm'
import {postEvent} from '../store/event'

export const EventFormPage = props => (
  <div className="container">
    <h1> Create Event </h1>
    <EventForm formAction="Create" onSubmit={props.onSubmit} />
  </div>
)
const mapDispatchToProps = dispatch => ({
  onSubmit: newEvent => dispatch(postEvent(newEvent))
})
export default connect(null, mapDispatchToProps)(EventFormPage)
