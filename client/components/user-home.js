import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  PlayerAdd,
  PlayerList,
  EventCard,
  EventActionButton
} from '../components'
import {fetchAllEvents} from '../store/event'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUsersEvents()
  }

  render() {
    const userEvents = Object.values(this.props.events.byId)
    return userEvents ? (
      <div className="container">
        <h5>Welcome, {this.props.email}</h5>
        <div className="divider" />
        <div className="section">
          {' '}
          <h6>Pending Games</h6>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          {/* Might Not Be the Best way to do this,
        filter out the events of the appropriate type, then map over them with JSX components */}
          {userEvents.filter(event => event.status === 'pending').map(event => {
            console.log(event)
            return (
              <EventCard
                key={event.id}
                id={event.id}
                details={event.description}
                title={event.name}
                type="pending"
              />
            )
          })}
        </div>
        <div className="section">
          {' '}
          <h6>Completed Games</h6>{' '}
        </div>
        <div className="divider" />
        <div className="row">
          {/* Once again, filter out the events of the appropriate type, then map over them with JSX components

          Other Idea would be to map and return null when failure of condition, but would then have several null values
          */}
          {userEvents
            .filter(event => event.status === 'done')
            .map(event => (
              <EventCard
                key={event.id}
                details={event.description}
                title={event.name}
                type="done"
              />
            ))}
        </div>
        {/* <PlayerAdd />
      <PlayerList /> */}
        <EventActionButton />
      </div>
    ) : (
      <h1> Loading </h1>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    events: state.events
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
