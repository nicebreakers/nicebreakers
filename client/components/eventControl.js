import React from 'react'
import {connect} from 'react-redux'

import {
  sendGameInitEvent,
  sendEndGameEvent,
  isEventDone,
  leaderRequestNextRound,
  getRound,
  resetRound,
  isEventPending,
  sendEventEmail
} from '../store'

import socket from '../socket'
import {
  ROOM,
  EVENT_PREFIX,
  USER_JOINED,
  USER_LEFT_ROOM
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
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId})
      console.log(`Emitted ${ROOM} for event ${eventId}`)
    }
    socket.on(USER_JOINED, userObject => {
      console.log(
        `Signal received from user=${userObject.email} and userId=${
          userObject.id
        }`
      )
      const newAvail = [...this.state.available, userObject.id]
      if (this.state.available.includes(userObject.id)) {
        //do nothing
      } else {
        this.setState({available: newAvail})
      }
    })

    socket.on(USER_LEFT_ROOM, ({user}) => {
      // console.log(`user ${user.email} with id=${user.id} left`)
      console.log('Inside event control', user)
      let currAvail = this.state.available
      const newAvail = currAvail.filter(num => num !== user.id)
      this.setState({available: newAvail})
    })
  }

  initGameWrapper = eventId => {
    this.props.initGame(eventId)
    this.props.resetRounds()
  }

  nextRoundWrapper = (eventId, currRound) => {
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
    const {match} = this.props
    const {eventId} = match.params
    return (
      <div className="container">
        <h3 className="heading">
          {this.props.event.byId[eventId]
            ? this.props.event.byId[eventId].name
            : 'Leader Controls'}
        </h3>
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

          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={() => {
                this.props.sendReport(eventId)
                this.props.endGame(eventId)
              }}
              disabled={this.disableEnd()}
            >
              End Game
            </button>
          </div>
          <div>
            <br />
            <br />
            <br />
            <h6>
              Round {this.props.currRound} of {this.props.maxRounds}{' '}
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, {match}) => ({
  isGameDone: isEventDone(state, match.params.eventId),
  isGamePending: isEventPending(state, match.params.eventId),
  currRound: getRound(state, match.params.eventId),
  maxRounds: 3,
  event: state.events
})

const mapDispatch = dispatch => ({
  initGame: eventId => dispatch(sendGameInitEvent(eventId)),
  endGame: eventId => dispatch(sendEndGameEvent(eventId)),
  nextRound: (eventId, round) =>
    dispatch(leaderRequestNextRound(eventId, round)),
  resetRounds: () => dispatch(resetRound()),
  sendReport: eventId => dispatch(sendEventEmail(eventId))
})

export default connect(mapState, mapDispatch)(EventControl)
