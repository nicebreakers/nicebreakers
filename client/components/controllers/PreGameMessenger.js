import React from 'react'

const PreGameMessenger = props => {
  const {preGameMessage} = props
  return (
    <div className="center">
      <h5 className="card-panel blue lighten-4">{preGameMessage}</h5>
    </div>
  )
}

export default PreGameMessenger
