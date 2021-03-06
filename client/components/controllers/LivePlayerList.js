import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPlayersByEventId} from '../../store'

class LivePlayerList extends Component {
  componentDidMount() {
    const {getUsersAtEvent} = this.props
    getUsersAtEvent()
  }

  isConnected = partId => {
    if (this.props.available.includes(partId)) {
      return 'green'
    }
    return 'red'
  }

  nameOrEmail = part => {
    if (!part.firstName) {
      return part.email
    }
    return `${part.firstName} ${part.lastName}`
  }

  render() {
    const {participants} = this.props
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>Participants</h4>
          </li>
          {participants.map(participant => {
            return (
              <li
                className={`collection-item ${this.isConnected(
                  participant.id
                )}`}
                key={participant.id}
              >
                <div>{this.nameOrEmail(participant)}</div>
              </li>
            )
          })}
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
