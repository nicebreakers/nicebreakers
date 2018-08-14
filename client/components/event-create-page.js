import React, {Component} from 'react'
import {connect} from 'react-redux'
import EventForm from './game-forms/EventForm'
import {postEvent} from '../store/event'

class EventFormPage extends Component {
  onSubmit = newEvent => {
    this.props.submitEvent(newEvent)
  }
  render() {
    return (
      <div>
        <h1> Create Event </h1>
        <EventForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  submitEvent: newEvent => dispatch(postEvent(newEvent))
})
export default connect(null, mapDispatchToProps)(EventFormPage)
