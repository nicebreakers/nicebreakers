import React, {Component} from 'react'
import {fetchPlayersByEventId, sendGameInitEvent} from '../store'
import {connect} from 'react-redux'
import socket from '../socket'

class LivePlayerList extends Component {
  componentDidMount() {
    const {getUsersAtEvent} = this.props
    getUsersAtEvent()
    socket.on('USER_JOINED', userId => {
      console.log(`User ${userId}, joined`)
    })
  }

  isConnected = partId => {
    if (this.props.available.includes(partId)) {
      return 'green'
    }
    return 'red'
  }

  render() {
    const {participants, eventId} = this.props
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>Participants</h4>
          </li>
          {participants.map(participant => (
            <li
              className={`collection-item ${this.isConnected(participant.id)}`}
              key={participant.id}
            >
              <div>{participant.email}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  participants: state.usersAtEvent || []
})

const mapDispatchToProps = (dispatch, {eventId}) => ({
  getUsersAtEvent: () => dispatch(fetchPlayersByEventId(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LivePlayerList)
