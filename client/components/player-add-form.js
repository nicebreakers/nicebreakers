import React from 'react'
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types'

let PlayerAddForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Participant Email</label>
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="Email"
        />
        <button type="submit" disabled={pristine || submitting}>
          Add
        </button>
      </form>
    </div>
  )
}

PlayerAddForm = reduxForm({form: 'playerAddForm'})(PlayerAddForm)

export default PlayerAddForm


/**
 * PROP TYPES
 */
PlayerAddForm.propTypes = {
	handleSubmit: PropTypes.func,
}
