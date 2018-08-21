import React, {Fragment} from 'react'
import {Field, reduxForm} from 'redux-form'
import propTypes from 'prop-types'

/*
* Custom Validations
*/
// const futureDate = dateValue => {
//   return new Date(dateValue) < Date.now()
//     ? 'Event must be in the future'
//     : undefined
// }
const nameHasValue = name => {
  return !name || name === '' ? 'Event must have a name' : undefined
}

/**
 *
 * Component for rendering any form fields that need to validate
 */
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

let EventForm = props => {
  const {handleSubmit, pristine, submitting} = props

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventName">Event Name </label>
      <Field
        name="name"
        component={renderField}
        type="text"
        placeholder="My Event"
        validate={nameHasValue}
      />
      {/* <label htmlFor="date">Date of Event</label>
      <Field
        name="date"
        component={renderField}
        type="date"
        label={Date.now()}
        validate={futureDate}
        warn={futureDate}
      /> */}
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
      {props.formAction === 'Edit' && (
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
        {props.formAction} This Event{' '}
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
