import React from 'react'

import socket from '../socket'
import {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  ROOM,
  EVENT_PREFIX
} from '../../server/socket/events'

export default class EventControl extends React.Component {
  componentDidMount = () => {
    // Oh hey, this component is only rendered when we want to run
    // an event.  So let's ask the server for a room for that
    const {eventId} = this.props.match.params
    if (eventId) {
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId})
      console.log(`Emitted ${ROOM} for event ${eventId}`)
    }
  }
  sendRequestNextRoundEvent = () => {
    const {eventId} = this.props.match.params
    socket.emit(REQUEST_NEXT_ROUND, {eventId})
    console.log(`Emitted ${REQUEST_NEXT_ROUND} for event ${eventId}`)
  }
  sendMoveToReviewEvent = () => {
    //socket code
  }
  sendGameInitEvent = () => {
    const {eventId} = this.props.match.params
    socket.emit(START_EVENT, {eventId})
    console.log(`Emitted ${START_EVENT} for event ${eventId}`)
  }
  render() {
    return (
      <div className="container">
        <h3 className="heading">Leader Control</h3>
        <br />
        <div className="row">
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendGameInitEvent}
            >
              Start Event
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendRequestNextRoundEvent}
            >
              Next Round
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendMoveToReviewEvent}
            >
              Move To Review
            </button>
          </div>
        </div>
      </div>
    )
  }
}
