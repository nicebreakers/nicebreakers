import React from 'react'
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addUserToEvent} from '../../store'

let PlayerAddForm = props => {
  const {handleSubmit, pristine, submitting, match} = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Invite Participant by Email</label>
      <Field name="email" component="input" type="email" placeholder="email" />
      <button type="submit" className="btn-flat green-text">
        add player
      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch, {eventId}) => ({
  onSubmit: formInfo => {
    dispatch(addUserToEvent(formInfo.email, eventId))
  }
})

PlayerAddForm = reduxForm({form: 'playerAddForm'})(PlayerAddForm)
PlayerAddForm = connect(null, mapDispatchToProps)(PlayerAddForm)

export default PlayerAddForm

/**
 * PROP TYPES
 */
PlayerAddForm.propTypes = {
  handleSubmit: PropTypes.func
}
