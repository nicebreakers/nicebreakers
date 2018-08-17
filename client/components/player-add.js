import React from 'react'
import {PlayerAddForm} from '../components'
import {addUserToEvent} from '../store'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const PlayerAdd = props => <PlayerAddForm onSubmit={props.submit} />

const mapDispatchToProps = (dispatch, {eventId}) => ({
  submit: formInfo => {
    dispatch(addUserToEvent(formInfo.email, eventId))
  }
})

export default connect(null, mapDispatchToProps)(PlayerAdd)

/**
 * PROP TYPES
 */
PlayerAdd.propTypes = {
  submit: PropTypes.func
}
