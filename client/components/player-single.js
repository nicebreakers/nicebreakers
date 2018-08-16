import React from 'react'

const PlayerSingle = props => {
  const {data, handleClick} = props
  return (
    <div className="col s6">
      <h5 style={{display: 'inline-block'}}>{data}</h5>
      <button type="button" onClick={event => handleClick(event, data)}>
        Remove
      </button>
    </div>
  )
}

export default PlayerSingle
