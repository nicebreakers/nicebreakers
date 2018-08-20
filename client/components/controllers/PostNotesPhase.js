import React from 'react'

const PostNotesPhase = props => {
  const {postNotesPhaseMessage} = props
  return (
    <div className="row">
      <div className="card lighten-4 s12 m8 l6 xl3">
        <div className="card-title">Please wait</div>
        <div className="card-content">
          <p>{postNotesPhaseMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default PostNotesPhase
