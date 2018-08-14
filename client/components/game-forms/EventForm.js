import React from 'react'
import {Field, reduxForm} from 'redux-form'
import propTypes from 'prop-types'

let EventForm = props => {
  const {handleSubmit, pristine, submitting} = props

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventName"> Event Name </label>
      <Field name="name" component="input" type="text" placeholder="Event" />
      <label htmlFor="date">Date of Event</label>
      <Field name="date" component="input" type="date" />
      <label htmlFor="location"> Event Location</label>

      <Field
        name="location"
        component="input"
        type="text"
        placeholder="Chicago"
      />
      <label htmlFor="description">Event Description</label>
      <Field
        name="description"
        component="input"
        type="text"
        placeholder="An Event in Chicago"
      />
      <button type="submit" disabled={pristine || submitting}>
        {' '}
        Create Game{' '}
      </button>
    </form>
  )
}

EventForm = reduxForm({
  form: 'eventForm'
})(EventForm)

export default EventForm

EventForm.propTypes = {
  description: propTypes.string,
  name: propTypes.string
}