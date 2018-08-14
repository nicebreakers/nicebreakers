import React from 'react'
import {Link} from 'react-router-dom'

const GameEnded = props => {
  const {gameEndedMessage} = props
  return (
    <div>
      <div className="center">
        <h5 className="card-panel blue lighten-4">{gameEndedMessage}</h5>
      </div>
      {/* link for end of game summary */}
      <Link className="waves-effect waves-light btn" to="/home">
        Go to Dashboard
      </Link>
    </div>
  )
}

export default GameEnded
