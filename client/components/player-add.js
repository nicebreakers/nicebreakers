import React, {Component} from 'react'
import {PlayerAddForm} from '../components';
import {createPlayer} from '../store'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class PlayerAdd extends Component {
	submit = (newPlayer) => {
		this.props.addPlayer(newPlayer)
	}

	render() {
		return <PlayerAddForm onSubmit={this.submit} />
	}
}

const mapDispatchToProps = dispatch => ({
  addPlayer: newPlayer => dispatch(createPlayer(newPlayer))
})

export default connect(null, mapDispatchToProps)(PlayerAdd)

/**
 * PROP TYPES
 */
PlayerAdd.propTypes = {
	addPlayer: PropTypes.func,
}
