import React from 'react'

const GameEnded = props => {
  return (
    <div className="container">
      <div className="row center">
        <h5 className="header col s12 light">Thank you for playing</h5>
      </div>
      {/* link for end of game summary */}
      <button type="button">Go to Dashboard</button>
    </div>
  )
}

export default GameEnded
