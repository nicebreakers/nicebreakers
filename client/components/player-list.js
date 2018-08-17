import React, {Component} from 'react'
import {PlayerSingle} from '../components'
import {deletePlayer, fetchPlayersByEventId} from '../store'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

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
    const {participants} = this.props
    return (
      <div>
        {participants.map(participant => (
          <PlayerSingle
            key={participant.id}
            participant={participant}
            handleClick={this.handleClick}
          />
        ))}
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
