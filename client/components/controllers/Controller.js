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
  getPrompt,
  getMe,
  fetchAllEvents
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
  END_EVENT,
  USER_JOINED_ROOM
} from '../../../server/socket/events'

class Controller extends Component {
  async componentDidMount() {
    //removes listeners, making sure we don't duplicate any while we create more
    socket.removeAllListeners([
      EVENT_STARTED,
      NEXT_ROUND,
      EVENT_ENDED,
      START_EVENT,
      END_EVENT,
      REQUEST_NEXT_ROUND,
      USER_JOINED_ROOM
    ])
    /*
    *   Load in Store State
    */
    this.props.getAllPrompts()
    await this.props.fetchEvents()

    /*
    *   REGISTER INTO THE ROOM
    */
    // Oh hey, this component is only rendered when we want to join
    // an event.  So let's ask the server for a room for that
    const {eventId} = this.props.match.params
    const {userObject} = this.props

    if (eventId) {
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId})
      console.log(
        `Emitted ${ROOM} for event ${eventId} and user ${userObject.email}`
      )
      socket.emit(USER_JOINED_ROOM, {eventId, message: this.props.userObject})
    }

    this.props.fetchRound(eventId, this.props.currentRound)

    /*
    *   SOCKET EVENTS
    */
    socket.on(EVENT_STARTED, ({eventId}) => {
      console.log(`Got ${EVENT_STARTED} with payload=`, eventId)
      const updatedEvent = {
        ...this.props.event, // THIS MUST STAY LIKE THIS OTHERWISE BUG.
        status: 'in_progress'
      }
      // we need to update the status only AFTER we get the interactions.
      console.log(`fetching round 1 for event ${eventId}`)
      this.props.fetchRound(eventId, 1, updatedEvent)
    })

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

  componentWillUnmount() {
    socket.removeAllListeners()
    // Make sure to clean up all socket events in case this is re-rendered.
    // Needed along with the one in componentDidMount; not sure why
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
    const gameEndedMessage = `The game has ended. Check your email for your story!`
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
    return (
      <div className="container">
        <h4> Round {this.props.currentInteraction.round || 1} of 3</h4>
        {whichComponentToRender}
      </div>
    )
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
    question: getPrompt(state),
    userObject: getMe(state),
    currentInteraction: state.interaction.currentInteraction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPrompts: () => dispatch(fetchAllPrompts()),
    updateEventStatus: event => dispatch(updateEventStatus(event)),
    fetchRound: (eventId, round, updatedEvent) =>
      dispatch(getRoundInteraction(eventId, round, updatedEvent)),
    fetchEvents: () => dispatch(fetchAllEvents())
    // onSubmit: newInteraction => dispatch(postInteraction(newInteraction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
