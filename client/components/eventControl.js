import React from 'react'
import {connect} from 'react-redux'

import {
  sendGameInitEvent,
  sendEndGameEvent,
  isEventDone,
  leaderRequestNextRound,
  getRound,
  resetRound
} from '../store'

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

  sendMoveToReviewEvent = () => {
    //socket code
  }

  initGameWrapper = eventId => {
    this.props.initGame(eventId)
    this.props.resetRounds()
  }

  nextRoundWrapper = (eventId, currRound) => {
    console.log('this is the current round', currRound)
    if (currRound >= 4) {
      //do nothing
    } else {
      this.props.nextRound(eventId, currRound)
    }
  }

  render() {
    const {initGame, nextRound, match} = this.props
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
              onClick={() => this.initGameWrapper(eventId)}
            >
              Start Event
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              disabled={this.props.isGameDone}
              onClick={() =>
                this.nextRoundWrapper(eventId, this.props.currRound)
              }
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
  isGameDone: isEventDone(state, match.params.eventId),
  currRound: getRound(state)
})

const mapDispatch = dispatch => ({
  initGame: eventId => dispatch(sendGameInitEvent(eventId)),
  endGame: eventId => dispatch(sendEndGameEvent(eventId)),
  nextRound: (eventId, round) =>
    dispatch(leaderRequestNextRound(eventId, round)),
  resetRounds: () => dispatch(resetRound())
})

export default connect(mapState, mapDispatch)(EventControl)
