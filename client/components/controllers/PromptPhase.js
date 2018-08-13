import React from 'react'

const PromptPhase = props => {
  const {shape, prompt} = props
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-image">
            <img src={shape} />
          </div>
          <div className="card-content">
            <p>{prompt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptPhase
