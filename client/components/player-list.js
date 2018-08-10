import React, {Component} from 'react'
import {PlayerSingle} from '../components'
import {deletePlayer, fetchAllPlayers} from '../store'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class PlayerList extends Component {
  componentDidMount() {
    const {getPlayers} = this.props
    getPlayers()
  }
  handleClick = (event, data) => {
    event.preventDefault()
    this.props.removePlayer(data)
  }
  render() {
    const {players} = this.props
    return (
      <div>
        {players.map((singleEmail, index) => (
          <PlayerSingle
            key={index}
            data={singleEmail}
            handleClick={this.handleClick}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.player || []
})

const mapDispatchToProps = dispatch => ({
  removePlayer: playerId => dispatch(deletePlayer(playerId)),
  getPlayers: () => dispatch(fetchAllPlayers())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList)

/**
 * PROP TYPES
 */
PlayerList.propTypes = {
  players: PropTypes.array,
  getPlayers: PropTypes.func,
  removePlayer: PropTypes.func
}
