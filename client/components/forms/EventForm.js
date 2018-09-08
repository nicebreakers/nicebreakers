import React, {Fragment} from 'react'
import {Field, reduxForm} from 'redux-form'

const nameHasValue = name =>
  !name || name === '' ? 'Event must have a name' : undefined

const renderField = ({input, type, label, meta: {touched, error}}) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      (error && (
        <div className="btn red">
          <span> {error} </span>
        </div>
      ))}
  </div>
)

let EventForm = ({handleSubmit, pristine, submitting, formAction}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="eventName">Event Name </label>
    <Field
      name="name"
      component={renderField}
      type="text"
      placeholder="My Event"
      validate={nameHasValue}
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
    {formAction === 'Edit' && (
      <Fragment>
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
      </Fragment>
    )}
    <button
      className="btn waves waves-light"
      type="submit"
      disabled={pristine || submitting}
    >
      {' '}
      {formAction} This Event{' '}
    </button>
  </form>
)

EventForm = reduxForm({
  form: 'eventForm'
})(EventForm)

export default EventForm
