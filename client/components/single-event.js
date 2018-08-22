import React from 'react'
import {PlayerList, PlayerAddForm} from '../components'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const detailDivStyle = 'col s12 m6'
const detailHeadingStyle = 'blue-text text-darken-3'

const DetailsSection = ({event}) => (
  <div className="row">
    <div
      className={`col s12 ${event.status === 'in_progress' &&
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
    {/* <div className={detailDivStyle}>
      <h6 className={detailHeadingStyle}> Date of Event </h6>
      <div className="divider" />
      <p> {event.date || "This event hasn't been scheduled."}</p>
    </div> */}
    <div className={detailDivStyle}>
      <h6 className={detailHeadingStyle}> Location</h6>
      <div className="divider" />
      <p> {event.location || 'No location set.'}</p>
    </div>
    <div className={detailDivStyle}>
      <h6 className={detailHeadingStyle}> Description</h6>
      <div className="divider" />
      <p> {event.description} </p>
    </div>
  </div>
)

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
              <i className="material-icons left">settings</i>
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
        {event.status === 'done' &&
          user.role !== 'participant' && (
            <Link
              to={`/events/${event.id}/reports`}
              className="btn-flat green darken-4 white-text"
            >
              <i className="material-icons left">view_comfy</i>
              View Event Report
            </Link>
          )}
        <div className="divider" />
      </div>
      <div className="section">
        <DetailsSection event={event} />
      </div>
      <div className="row">
        {user.role !== 'participant' && (
          <PlayerList eventId={match.params.eventId} />
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/home" />
  )
}
const mapState = (state, {match}) => ({
  user: state.user,
  event: state.events.byId[match.params.eventId]
})

export default connect(mapState)(SingleEventPage)
