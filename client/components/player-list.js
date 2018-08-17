import React, {Component} from 'react'
import {deletePlayer, fetchPlayersByEventId} from '../store'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {PlayerAddForm} from '../components'

class PlayerList extends Component {
  componentDidMount() {
    const {getUsersAtEvent} = this.props
    getUsersAtEvent()
  }
  handleClick = (event, data) => {
    event.preventDefault()
    this.props.removePlayer(data)
  }
  render() {
    const {participants, eventId} = this.props
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>Participants</h4>
          </li>
          <li className="collection-item">
            <div>
              <PlayerAddForm eventId={eventId} />
            </div>
            <span />
            <button
              className="btn-flat blue-text"
              type="button"
              onClick={() => console.log('Invites Sent')}
            >
              {' '}
              Send out Invites!{' '}
            </button>
          </li>
          {participants.map(participant => (
            <li className="collection-item" key={participant.id}>
              <div>
                {participant.email}
                <a
                  onClick={event => this.handleClick(event, participant)}
                  className="secondary-content red-text"
                  href="#"
                >
                  <i className="material-icons">remove_circle</i>
                </a>
              </div>
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
  removePlayer: playerId => dispatch(deletePlayer(playerId)),
  getUsersAtEvent: () => dispatch(fetchPlayersByEventId(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList)

/**
 * PROP TYPES
 */
PlayerList.propTypes = {
  players: PropTypes.array,
  getUsersAtEvent: PropTypes.func,
  removePlayer: PropTypes.func
}
