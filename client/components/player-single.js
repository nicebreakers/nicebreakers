import React from 'react'

const PlayerSingle = props => {
  const {participant, handleClick} = props
  return (
    <div className="col s6">
      <h5 style={{display: 'inline-block'}}>{participant.email}</h5>
      <button type="button" onClick={event => handleClick(event, participant)}>
        Remove
      </button>
    </div>
  )
}

export default PlayerSingle
