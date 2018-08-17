import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getEventsByStatus, fetchAllEvents} from '../store/event'
import {EventCard, EventActionButton} from '../components'
import InstructionPanel from './user-home/instructionsPanel'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getUsersEvents()
  }
  render() {
    const props = this.props
    return (
      <div className="container">
        <InstructionPanel />
        <h5>Welcome, {props.email}</h5>
        <div className="divider" />
        <div className="section">
          {' '}
          <h6>Pending Events</h6>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          {props.pendingEvents.map(event => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                details={event.description}
                title={event.name}
                type="pending"
                notParticipant={props.notParticipant}
              />
            )
          })}
        </div>
        <div className="section">
          {' '}
          <h6>Completed Events</h6>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          {props.doneEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              details={event.description}
              title={event.name}
              type="done"
              notParticipant={props.notParticipant}
            />
          ))}
        </div>
        <EventActionButton />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    events: state.events,
    pendingEvents: getEventsByStatus(state, 'pending'),
    doneEvents: getEventsByStatus(state, 'done'),
    notParticipant: state.user.role !== 'participant'
  }
}
const mapDispatch = dispatch => ({
  getUsersEvents: () => dispatch(fetchAllEvents())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
