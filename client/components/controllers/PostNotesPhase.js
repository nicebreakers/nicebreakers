import React from 'react'

const PostNotesPhase = props => {
  const {postNotesPhaseMessage} = props
  return (
    <div className="row center">
      <h5 className="card-panel blue lighten-4 s12">{postNotesPhaseMessage}</h5>
    </div>
  )
}

export default PostNotesPhase
