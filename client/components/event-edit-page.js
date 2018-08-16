import React from 'react'
import {connect} from 'react-redux'
import EventForm from './game-forms/EventForm'
import {changeEventAllFields} from '../store/event'
import history from '../history'

export const EditEventFormPage = props => {
  if (props.event.date) {
    props.event.date = props.event.date.substring(0, 10) //fixes prepopulation of date
  }
  return (
    <div>
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

const mapDispatch = (dispatch, {match}) => ({
  onSubmit: updatedValues => {
    dispatch(changeEventAllFields(updatedValues, match.params.eventId))
    history.push('/home')
  }
})
export default connect(mapState, mapDispatch)(EditEventFormPage)
