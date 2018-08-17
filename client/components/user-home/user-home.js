import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getEventsByStatus, fetchAllEvents} from '../../store/event'
import {EventCard, EventActionButton} from '..'
import InstructionPanel from './instructionsPanel'

const EventList = ({eventArray, type, message}) => {
  if (!eventArray.length) return <h6>{message}</h6>
  else
    return eventArray.map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        details={event.description}
        title={event.name}
        type={type}
      />
    ))
}

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
        <div className="section">
          {' '}
          <h5>In Progress Events</h5>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          <EventList
            eventArray={this.props.inProgressEvents}
            type="in_progress"
            message="No events are in progress."
          />
        </div>
        <div className="divider" />
        <div className="section">
          {' '}
          <h5>Pending Events</h5>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          <EventList
            eventArray={this.props.pendingEvents}
            type="pending"
            message="No pending events. Add one from the menu above."
          />
        </div>
        <div className="section">
          {' '}
          <h5>Completed Events</h5>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          <EventList
            eventArray={this.props.doneEvents}
            type="done"
            message="You have no completed events to review! Darn. Start one above!"
          />
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
    inProgressEvents: getEventsByStatus(state, 'in_progress'),
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