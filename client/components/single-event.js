import React from 'react'
import PlayerList from './player-list'
import PlayerAdd from './player-add'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const SingleEventPage = props => {
  return props.event ? (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <label> Event Name</label>
          <p> {props.event.name}</p>
        </div>
        <div className="col s12 m6">
          <label> Date of Event </label>
          <p> {props.event.date}</p>
        </div>
        <div className="col s12 m6 ">
          <label> Location</label>
          <p> {props.event.location}</p>
        </div>
        <div className="col s12 m6">
          <label> Event Status </label>
          <p> {props.event.status}</p>
        </div>
        <div className="col">
          <label> Description</label>
          <p> {props.event.description} </p>
        </div>
      </div>
      <Link to={`/events/${props.event.id}/edit`} className="white-text btn">
        Edit Event
      </Link>
      <div className="row">
        <PlayerList eventId={props.match.params.eventId} />
      </div>
      <div className="row">
        <div className="col s6">
          <p> Add Some Friends </p>
          <PlayerAdd eventId={props.match.params.eventId} />
        </div>
        <div className="col s6">
          <button
            className="btn"
            button="button"
            onClick={() => console.log('Invites Sent')}
          >
            {' '}
            Send out Invites!{' '}
          </button>
        </div>
      </div>
      {props.event.status === 'pending' && (
        <div className="btn m7">
          <Link to={`/events/${props.event.id}/console`} className="white-text">
            Go Event Controls
          </Link>
        </div>
      )}
    </div>
  ) : (
    <h1> Loading </h1>
  )
}
const mapState = (state, {match}) => ({
  event: state.events.byId[match.params.eventId]
})

export default connect(mapState)(SingleEventPage)
