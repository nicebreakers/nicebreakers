import React from 'react'
import {connect} from 'react-redux'

<<<<<<< HEAD
import {sendGameInitEvent, sendEndGameEvent, isEventDone} from '../store'
=======
import {sendGameInitEvent, leaderRequestNextRound} from '../store'
>>>>>>> next round signal

import socket from '../socket'
import {
  REQUEST_NEXT_ROUND,
  // START_EVENT,
  ROOM,
  EVENT_PREFIX
} from '../../server/socket/events'

class EventControl extends React.Component {
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

  render() {
<<<<<<< HEAD
    console.log('done?', this.props.isGameDone)
    const {initGame, match} = this.props
=======
    const {initGame, nextRound, match} = this.props
>>>>>>> next round signal
    const {eventId} = match.params
    return (
      <div className="container">
        <h3 className="heading">Leader Control</h3>
        <br />
        <div className="row">
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={() => initGame(eventId)}
            >
              Start Event
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
<<<<<<< HEAD
              onClick={this.sendRequestNextRoundEvent}
              disabled={this.props.isGameDone}
=======
              onClick={() => nextRound(eventId)}
>>>>>>> next round signal
            >
              Next Round
            </button>
          </div>
          {/* <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendMoveToReviewEvent}
            >
              Move To Review
            </button>
          </div> */}
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={() => this.props.endGame(eventId)}
            >
              End Game
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, {match}) => ({
  isGameDone: isEventDone(state, match.params.eventId)
})

const mapDispatch = dispatch => ({
  initGame: eventId => dispatch(sendGameInitEvent(eventId)),
<<<<<<< HEAD
  endGame: eventId => dispatch(sendEndGameEvent(eventId))
=======
  nextRound: eventId => dispatch(leaderRequestNextRound(eventId))
>>>>>>> next round signal
})

export default connect(mapState, mapDispatch)(EventControl)
