import React from 'react'
import {Field, reduxForm} from 'redux-form'
import propTypes from 'prop-types'

let EventForm = props => {
  const {handleSubmit, pristine, submitting} = props

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventName">Event Name </label>
      <Field name="name" component="input" type="text" placeholder="My Event" />
      <label htmlFor="date">Date of Event</label>
      <Field
        name="date"
        component="input"
        type="date"
        placeholder={Date.now()}
      />
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
      <label>Event Status</label>
      <Field
        name="status"
        component="select"
        ref={() => $('select').formSelect()}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </Field>
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
  name: propTypes.string,
  location: propTypes.string

}
