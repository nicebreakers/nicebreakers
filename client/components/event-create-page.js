import React from 'react'

import {connect} from 'react-redux'
import EventForm from './game-forms/EventForm'
import {postEvent} from '../store/event'
import history from '../history'

export const EventFormPage = props => (
  <div className="container">
    <h1> Create Event </h1>
    <EventForm formAction="Create" onSubmit={props.onSubmit} />
  </div>
)
const mapDispatchToProps = dispatch => ({
  onSubmit: newEvent => {
    dispatch(postEvent(newEvent))
    history.push('/home')
  }
})
export default connect(null, mapDispatchToProps)(EventFormPage)
