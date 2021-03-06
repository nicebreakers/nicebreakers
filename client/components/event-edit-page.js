import React from 'react'
import {connect} from 'react-redux'
import EventForm from './forms/EventForm'
import {changeEventAllFields} from '../store/event'

export const EditEventFormPage = props => {
  if (props.event && props.event.date) {
    props.event.date = props.event.date.substring(0, 10) //fixes prepopulation of date
  }
  return (
    <div className="container section">
      <h1> Edit Event </h1>
      <EventForm
        formAction="Edit"
        initialValues={props.event}
        onSubmit={props.onSubmit}
      />
    </div>
  )
}
const mapState = (state, {match}) => ({
  event: state.events.byId[match.params.eventId]
})
const mapDispatch = dispatch => ({
  onSubmit: updatedValues => {
    dispatch(changeEventAllFields(updatedValues))
  }
})
export default connect(mapState, mapDispatch)(EditEventFormPage)
