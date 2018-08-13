import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {PlayerAdd, PlayerList, GameCard, GameActionButton} from '../components'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="container">
      <h5>Welcome, {email}</h5>
      <div className="divider" />
      <div className="section">
        {' '}
        <h6>Pending Games</h6>{' '}
      </div>
      <div className="divider" />
      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(card => (
          <GameCard key={card} type="pending" />
        ))}
      </div>
      <div className="section">
        {' '}
        <h6>Completed Games</h6>{' '}
      </div>
      <div className="divider" />
      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(card => (
          <GameCard key={card} type="done" />
        ))}
      </div>
      {/* <PlayerAdd />
      <PlayerList /> */}
      <GameActionButton />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
