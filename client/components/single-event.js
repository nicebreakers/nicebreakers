import React from 'react'
import {PlayerList, PlayerAddForm} from '../components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const SingleEventPage = ({event, match, user}) => {
  return event ? (
    <div className="container">
      <div className="section">
        <h6 className="blue-text lighten-3">
          <Link to="/home">home > </Link>

          <Link to={match.url}> event</Link>
        </h6>
        <h4 className="heading">{event.name}</h4>
        {user.role !== 'participant' && (
          <Link
            to={`/events/${event.id}/edit`}
            className="btn-flat yellow darken-4 white-text"
          >
            <i className="material-icons left">edit</i>
            Edit Event
          </Link>
        )}
        {event.status !== 'done' &&
          (user.role !== 'participant' ? (
            <Link
              to={`/events/${event.id}/console`}
              className="btn-flat green darken-4 white-text"
            >
              <i className="material-icons left">view_comfy</i>
              Go to Event Controls
            </Link>
          ) : (
            <Link
              className="btn-flat green darken-4 white-text"
              to={`/events/${event.id}/controller`}
            >
              <i className="material-icons left">important_devices</i>
              Join Event!
            </Link>
          ))}
        <div className="divider" />
      </div>
      <div className="row">
        <div
          className={`col s12 m6 ${event.status === 'in_progress' &&
            'green lighten-1 white-text'}`}
        >
          <h6
            className={
              event.status === 'in_progress'
                ? 'green lighten-1 white-text'
                : 'blue-text text-darken-3'
            }
          >
            {' '}
            Event Status{' '}
          </h6>
          <div className="divider" />
          <p>
            {event.status
              .charAt(0)
              .toUpperCase()
              .concat(event.status.slice(1).replace(/_/, ' '))}
          </p>
        </div>
        <div className="col s12 m6">
          <h6 className="blue-text text-darken-3"> Date of Event </h6>
          <div className="divider" />
          <p> {event.date || "This event hasn't been scheduled."}</p>
        </div>
        <div className="col s12 m6 ">
          <h6 className="blue-text text-darken-3"> Location</h6>
          <div className="divider" />
          <p> {event.location || 'No location set.'}</p>
        </div>
        <div className="col s12 m6">
          <h6 className="blue-text text-darken-3"> Description</h6>
          <div className="divider" />
          <p> {event.description} </p>
        </div>
        <div className="col s12 m6" />
      </div>
      <div className="row">
        {user.role !== 'participant' && (
          <PlayerList eventId={match.params.eventId} />
        )}
      </div>
      <div className="row">
        <div className="col s6" />
      </div>
      {!event.status !== 'done' &&
        (user.role === 'admin' ? (
          <div className="btn m7">
            <Link to={`/events/${event.id}/console`} className="white-text">
              Go Event Controls
            </Link>
          </div>
        ) : (
          <div className="btn m7">
            <Link className="white-text" to={`/events/${event.id}/controller`}>
              {' '}
              Join the Event{' '}
            </Link>
          </div>
        ))}
    </div>
  ) : (
    <h1> Loading </h1>
  )
}
const mapState = (state, {match}) => ({
  user: state.user,
  event: state.events.byId[match.params.eventId]
})

export default connect(mapState)(SingleEventPage)
