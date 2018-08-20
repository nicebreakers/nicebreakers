import React from 'react'

const PromptPhase = props => {
  const {shape, prompt} = props
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          <p>
            <strong>Prompt: </strong> <br />
            {prompt}
          </p>
        </div>
        <div className="card-image">
          <img src={shape} />
        </div>
      </div>
    </div>
  )
}

export default PromptPhase
