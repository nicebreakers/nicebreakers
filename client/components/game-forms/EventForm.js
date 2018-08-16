/*global M */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import propTypes from 'prop-types'

let EventForm = props => {
  const {handleSubmit, pristine, submitting} = props

  return (
    <div className="container">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 m6 input-field">
          <Field name="name" component="input" type="text" />
          <label htmlFor="name"> First Name </label>
        </div>
        <div className="col s12 m6 input-field">
          <Field
            name="date"
            component="input"
            type="date"
            placeholder={Date.now()}
          />
          <label htmlFor="date">Date of Event</label>
        </div>

        <div className="col s12 m6 input-field">
          <Field name="location" component="input" type="text" />
          <label htmlFor="location"> Event Location</label>
        </div>
        <div className="col s12 input-field">
          <Field name="description" component="input" type="text" />
          <label htmlFor="description">Event Description</label>
        </div>

        <div className="col s12 input-field">
          <Field
            name="status"
            component="select"
            ref={() => $('select').formSelect()}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </Field>
          <label>Event Status</label>
        </div>
        <div className="col s12 input-field">
          <button
            className="btn waves waves-light"
            type="submit"
            disabled={pristine || submitting}
            //Materialize Init
            ref={() => M.updateTextFields()}
          >
            {' '}
            {props.formAction} This Event{' '}
          </button>
        </div>
      </form>
    </div>
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
