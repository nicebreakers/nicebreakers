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
  getDisplayShape,
  isEventDone,
  getRound,
  getPrompt
} from '../../store'

import socket from '../../socket'
import {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  EVENT_STARTED,
  NEXT_ROUND,
  ROOM,
  EVENT_PREFIX,
  EVENT_ENDED,
  END_EVENT
} from '../../../server/socket/events'

class Controller extends Component {
  componentDidMount() {
    socket.removeAllListeners([
      EVENT_STARTED,
      NEXT_ROUND,
      EVENT_ENDED,
      START_EVENT,
      END_EVENT,
      REQUEST_NEXT_ROUND
    ])
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

      const updatedEvent = {
        ...this.props.event, // THIS MUST STAY LIKE THIS OTHERWISE BUG.
        status: 'in_progress'
      }
      this.props.fetchRound(eventId, 1, updatedEvent)
      // we need to update the status only AFTER we get the interactions.
    })

    const startFunc = ({eventId}) => {}

    socket.on(EVENT_ENDED, ({eventId}) => {
      console.log(`Got ${EVENT_ENDED} with payload=`, eventId)
      this.props.updateEventStatus({
        ...this.props.event, // THIS MUST STAY LIKE THIS OTHERWISE BUG.
        status: 'done'
      })
    })

    socket.on(NEXT_ROUND, data => {
      console.log(`Got ${NEXT_ROUND} with payload=`, data)
      console.log(`fetching round ${data.round} for event ${data.eventId}`)
      this.props.fetchRound(data.eventId, data.round)
    })
  }

  componentDidUpdate() {
    /*
    *   Destructure Props.
    */
  }

  componentWillUnmount() {
    socket.removeAllListeners()
    // Make sure to clean up all socket events in case this is re-rendered.
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
    const gameEndedMessage = `Thank you for playing`
    const postNotesPhaseMessage = `Waiting for the next round`
    const preGameMessage = `Please wait for the event to begin`

    if (this.props.pending) {
      return <PreGameMessenger preGameMessage={preGameMessage} />
    } else if (this.props.isDone) {
      return <GameEnded gameEndedMessage={gameEndedMessage} />
    } else {
      switch ('Prompt') {
        case 'Prompt':
          return (
            <div>
              <PromptPhase
                shape={this.props.shape}
                prompt={this.props.question}
              />
              <NotesPhase />
            </div>
          )
        // case 'Notes':
        //   return <NotesPhase />
        // case 'PostNotes':
        //   return (
        //     <PostNotesPhase postNotesPhaseMessage={postNotesPhaseMessage} />
        //   )
        case 'GameEnded':
          return <GameEnded gameEndedMessage={gameEndedMessage} />
        default:
          return <PreGameMessenger preGameMessage={preGameMessage} />
      }
    }
  }

  render() {
    const whichComponentToRender = this.checkPhase()
    return <div className="container">{whichComponentToRender}</div>
  }
}

const mapStateToProps = (state, {match}) => {
  return {
    shape: getDisplayShape(state),
    prompt: Object.values(state.prompt.byId),
    pending: isEventPending(state, match.params.eventId),
    event: state.events.byId[match.params.eventId],
    isDone: isEventDone(state, match.params.eventId),
    currentRound: getRound(state, match.params.eventId),
    question: getPrompt(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPrompts: () => dispatch(fetchAllPrompts()),
    updateEventStatus: event => dispatch(updateEventStatus(event)),
    fetchRound: (eventId, round, updatedEvent) =>
      dispatch(getRoundInteraction(eventId, round, updatedEvent))
    // onSubmit: newInteraction => dispatch(postInteraction(newInteraction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
