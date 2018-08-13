import React from 'react'

const GameEnded = props => {
  return (
    <div className="container">
      <div className="center">
        <h5 className="card-panel blue lighten-4">Thank you for playing</h5>
      </div>
      {/* link for end of game summary */}
      <button type="button">Go to Dashboard</button>
    </div>
  )
}

export default GameEnded
