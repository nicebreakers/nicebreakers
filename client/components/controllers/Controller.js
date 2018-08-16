import React, {Component} from 'react'
import PreGameMessenger from './PreGameMessenger'
import GameEnded from './GameEnded'
import PostNotesPhase from './PostNotesPhase'
import NotesPhase from './NotesPhase'
import PromptPhase from './PromptPhase'
import {connect} from 'react-redux'
import {
  fetchAllPrompts,
  isEventPending,
  updateEventStatus,
  getRoundInteraction,
  getDisplayShape
} from '../../store'

import socket from '../../socket'
import {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  EVENT_STARTED,
  NEXT_ROUND,
  ROOM,
  EVENT_PREFIX
} from '../../../server/socket/events'

class Controller extends Component {
  // state = {
  //   value: 0
  // }

  componentDidMount() {
    /*
    *   Load in State
    */
    this.props.getAllPrompts()

    /*
    *   REGISTER INTO THE ROOM
    */
    // Oh hey, this component is only rendered when we want to join
    // an event.  So let's ask the server for a room for that
    const {eventId} = this.props.match.params

    if (eventId) {
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId})
      console.log(`Emitted ${ROOM} for event ${eventId}`)
    }

    /*
    *   SOCKET EVENTS
    */
    socket.on(EVENT_STARTED, ({eventId}) => {
      console.log(`Got ${EVENT_STARTED} with payload=`, eventId)

      this.props.fetchRound(eventId, 1)

      // this.props.updateEventStatus({
      //   ...this.props.event, // THIS MUST STAY LIKE THIS OTHERWISE BUG.
      //   status: 'in_progress'
      // })
    })

    socket.on(NEXT_ROUND, data => {
      console.log(`Got ${NEXT_ROUND} with payload=`, data)
      // do other stuff.
    })
  }

  componentDidUpdate() {
    /*
    *   Destructure Props.
    */
  }

  componentWillUnmount() {
    // Make sure to clean up all socket events in case this is re-rendered.
    socket.removeAllListeners([EVENT_STARTED, NEXT_ROUND])
  }

  //temporary (goes through the components until we have sockets in place)
  nextPhase = () => {
    const curr = this.state.value
    let next = (curr + 1) % 5
    this.setState({
      value: next
    })
  }

  randomPrompt = () => {
    const promptLength = this.props.prompt.length
    if (promptLength > 0) {
      const randNum = Math.floor(Math.random() * promptLength)
      return this.props.prompt[randNum].question
    }
    return 'No question'
  }

  checkPhase() {
    // console.log(this.props.prompt)
    // const phases = ['PreGame', 'Prompt', 'Notes', 'PostNotes', 'GameEnded']
    // const expr = phases[this.state.value]
    const gameEndedMessage = `Thank you for playing`
    const postNotesPhaseMessage = `Waiting for the next round`
    const preGameMessage = `Please wait for the event to begin`

    if (this.props.pending) {
      return <PreGameMessenger preGameMessage={preGameMessage} />
    } else {
      switch ('Prompt') {
        case 'Prompt':
          return (
            <PromptPhase
              shape={this.props.shape}
              prompt={this.randomPrompt()}
            />
          )
        case 'Notes':
          return <NotesPhase />
        case 'PostNotes':
          return (
            <PostNotesPhase postNotesPhaseMessage={postNotesPhaseMessage} />
          )
        case 'GameEnded':
          return <GameEnded gameEndedMessage={gameEndedMessage} />
        default:
          return <PreGameMessenger preGameMessage={preGameMessage} />
      }
    }
  }

  render() {
    const whichComponentToRender = this.checkPhase()
    return (
      <div className="container">
        {whichComponentToRender}
        <button
          className="waves-effect waves-light btn"
          type="button"
          onClick={() => this.nextPhase()}
        >
          Next
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  // const stoot = {
  //   interaction: {
  //     byId: {
  //       0: 'John',
  //       1: 'Susan'
  //     },
  //     currentInteraction: {
  //       id: 2,
  //       round: 3
  //     }
  //   }
  // }
  return {
    shape: getDisplayShape(state),
    prompt: Object.values(state.prompt.byId),
    pending: isEventPending(state, match.params.eventId),
    event: state.events.byId[match.params.eventId]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPrompts: () => dispatch(fetchAllPrompts()),
    updateEventStatus: event => dispatch(updateEventStatus(event)),
    fetchRound: (eventId, round) =>
      dispatch(getRoundInteraction(eventId, round))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
