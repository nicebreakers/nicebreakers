import React, {Component} from 'react'
import {connect} from 'react-redux'

// components
import {
  PromptPhase,
  NotesPhase,
  GameEnded,
  PreGameMessenger
} from '../controllers'

// selectors & event creators
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

// socket connection and events
import {
  START_EVENT,
  EVENT_STARTED,
  NEXT_ROUND,
  ROOM,
  EVENT_PREFIX,
  EVENT_ENDED,
  END_EVENT,
  USER_JOINED_ROOM,
  USER_LEFT
} from '../../../server/socket/events'
import socket from '../../socket'

// Helpers
let clearThis
function repeat(sock, eventId, content) {
  return setTimeout(function() {
    sock.emit(USER_JOINED_ROOM, {eventId, message: content})
  }, 5000)
}

const logDev = msg => process.env.NODE_ENV !== 'production' && console.log(msg)
const log = {
  emit: (room, id, email) =>
    logDev(`Emitted ${room} for event ${id} and user ${email}`),
  event: (evt, id) => logDev(`Got ${evt} with payload=${id}`),
  round: (round, id) => logDev(`fetching round ${round} for event ${id}`)
}

// messages
const gameEndedMessage = `The game has ended. Check your email for your story!`
const preGameMessage = `Please wait for the event to begin`

class Controller extends Component {
  async componentDidMount() {
    //removes listeners, making sure we don't duplicate any while we create more
    socket.removeAllListeners([
      EVENT_STARTED,
      NEXT_ROUND,
      EVENT_ENDED,
      START_EVENT,
      END_EVENT,
      USER_JOINED_ROOM,
      USER_LEFT
    ])

    // Load in Store State
    this.props.getAllPrompts()
    await this.props.fetchEvents()

    // Component is only rendered when we want to join event, so ask for a room.
    const {eventId} = this.props.match.params
    const {userObject} = this.props

    if (eventId) {
      socket.emit(ROOM, {room: EVENT_PREFIX + eventId})
      log.emit(ROOM, eventId, userObject.email)
      clearThis = repeat(socket, eventId, this.props.userObject)
      socket.emit(USER_JOINED_ROOM, {eventId, message: this.props.userObject})
    }

    this.props.fetchRound(eventId, this.props.currentRound)

    // Socket events
    socket.on(EVENT_STARTED, ({eventId: id}) => {
      const updatedEvent = {...this.props.event, status: 'in_progress'}
      log.event(EVENT_STARTED, id)
      log.round(1, id)
      this.props.fetchRound(id, 1, updatedEvent)
    })

    socket.on(EVENT_ENDED, ({eventId: id}) => {
      log.event(EVENT_ENDED, id)
      this.props.updateEventStatus({...this.props.event, status: 'done'})
    })

    socket.on(NEXT_ROUND, data => {
      log.event(NEXT_ROUND, data)
      log.round(data.round, data.eventId)
      this.props.fetchRound(data.eventId, data.round)
    })
  }

  componentWillUnmount() {
    const {userObject, match: {params: {eventId}}} = this.props

    socket.emit(USER_LEFT, {eventId, user: userObject})
    log.emit(USER_LEFT, eventId, userObject.email)

    socket.removeAllListeners() // clear listeners
    clearTimeout(clearThis) // clear polling
  }

  randomPrompt = () => {
    const promptLength = this.props.prompt.length
    return promptLength > 0
      ? this.props.prompt[Math.floor(Math.random() * promptLength)].question
      : 'No question'
  }

  checkPhase() {
    if (this.props.pending) {
      return <PreGameMessenger preGameMessage={preGameMessage} />
    } else if (this.props.isDone) {
      return <GameEnded gameEndedMessage={gameEndedMessage} />
    } else {
      return (
        <div>
          <PromptPhase shape={this.props.shape} prompt={this.props.question} />
          <NotesPhase />
        </div>
      )
    }
  }
  render() {
    const whichComponentToRender = this.checkPhase()
    const {event, currentInteraction} = this.props
    return (
      <div className="container">
        {event && <h3>{event.name}</h3>}
        <h6>Round {currentInteraction.round || 1} of 3</h6>
        {whichComponentToRender}
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  shape: getDisplayShape(state),
  prompt: Object.values(state.prompt.byId),
  pending: isEventPending(state, match.params.eventId),
  event: state.events.byId[match.params.eventId],
  isDone: isEventDone(state, match.params.eventId),
  currentRound: getRound(state, match.params.eventId),
  question: getPrompt(state),
  userObject: getMe(state),
  currentInteraction: state.interaction.currentInteraction
})

const mapDispatchToProps = dispatch => ({
  getAllPrompts: () => dispatch(fetchAllPrompts()),
  updateEventStatus: event => dispatch(updateEventStatus(event)),
  fetchRound: (id, round, event) =>
    dispatch(getRoundInteraction(id, round, event)),
  fetchEvents: () => dispatch(fetchAllEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
