import React from 'react'
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addUserToEvent} from '../store'
import {getParticipants} from '../store/participant'
import {Autocomplete} from 'react-autocomplete'

let PlayerAddForm = props => {
  console.log('PARTS', props.participants[0])
  const {handleSubmit, pristine, submitting, match} = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Invite Participant by Email</label>
      <Field name="email" component="Autocomplete" />
      <button type="submit" className="btn-flat green-text">
        add player
      </button>
    </form>
  )
}

const mapStateToProps = state => ({
  participants: getParticipants(state)
})

const mapDispatchToProps = (dispatch, {eventId}) => ({
  onSubmit: formInfo => {
    dispatch(addUserToEvent(formInfo.email, eventId))
  }
})

PlayerAddForm = reduxForm({form: 'playerAddForm'})(PlayerAddForm)
PlayerAddForm = connect(mapStateToProps, mapDispatchToProps)(PlayerAddForm)

export default PlayerAddForm

/**
 * PROP TYPES
 */
PlayerAddForm.propTypes = {
  handleSubmit: PropTypes.func
}
