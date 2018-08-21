import React from 'react'
import {connect} from 'react-redux'

import {
  sendGameInitEvent,
  sendEndGameEvent,
  isEventDone,
  leaderRequestNextRound,
  getRound,
  resetRound,
  isEventPending
} from '../store'

import socket from '../socket'
import {
  REQUEST_NEXT_ROUND,
  // START_EVENT,
  ROOM,
  EVENT_PREFIX
} from '../../server/socket/events'
import LivePlayerList from './LivePlayerList'

class EventControl extends React.Component {
  state = {
    available: []
  }
  componentDidMount = () => {
    // Oh hey, this component is only rendered when we want to run
    // an event.  So let's ask the server for a room for that
    const {eventId} = this.props.match.params
    if (eventId) {
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId, userId: 1})
      console.log(`Emitted ${ROOM} for event ${eventId} and user ${1}`)
    }
    socket.on('USER_JOINED', ({userId}) => {
      console.log(`Signal received from user=${userId}`)
      // this.setState({available:[userId]})
    })
  }

  sendMoveToReviewEvent = () => {
    //socket code
  }

  initGameWrapper = eventId => {
    this.props.initGame(eventId)
    this.props.resetRounds()
  }

  nextRoundWrapper = (eventId, currRound) => {
    console.log('the current round is ', currRound)
    if (currRound > 2) {
      //do nothing
      //having the 2 above makes sure the next round button can only be pressed twice (1 (initial round) + 2 (next round button) = 3 (rounds total))
    } else {
      this.props.nextRound(eventId, currRound + 1)
    }
  }

  disableStart = () => {
    const {isGamePending} = this.props
    return !isGamePending
  }

  disableNextRound = () => {
    const {isGamePending, isGameDone, currRound, maxRounds} = this.props
    if (isGameDone || isGamePending || currRound >= maxRounds) {
      return true
    }
    return false
  }

  disableEnd = () => {
    const {isGamePending, isGameDone} = this.props
    if (isGameDone || isGamePending) {
      return true
    }
    return false
  }

  render() {
    const {isGameDone, isGamePending, match, currRound, maxRounds} = this.props
    const {eventId} = match.params
    return (
      <div className="container">
        <h3 className="heading">Leader Control</h3>
        <br />
        <LivePlayerList
          eventId={match.params.eventId}
          available={this.state.available}
        />
        <div className="row">
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={() => this.initGameWrapper(eventId)}
              disabled={this.disableStart()}
            >
              Start Event
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              disabled={this.disableNextRound()}
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
              disabled={this.disableEnd()}
            >
              End Game
            </button>
          </div>
        </div>
        {currRound >= maxRounds && (
          <div className="row">
            <div className="col s11 btn waves waves-effect">
              {isGameDone ? 'Thanks For Playing!' : 'Final Round!'}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state, {match}) => ({
  isGameDone: isEventDone(state, match.params.eventId),
  isGamePending: isEventPending(state, match.params.eventId),
  currRound: getRound(state, match.params.eventId),
  maxRounds: 3
})

const mapDispatch = dispatch => ({
  initGame: eventId => dispatch(sendGameInitEvent(eventId)),
  endGame: eventId => dispatch(sendEndGameEvent(eventId)),
  nextRound: (eventId, round) =>
    dispatch(leaderRequestNextRound(eventId, round)),
  resetRounds: () => dispatch(resetRound())
})

export default connect(mapState, mapDispatch)(EventControl)
