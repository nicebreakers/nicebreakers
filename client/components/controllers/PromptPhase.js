import React from 'react'

const PromptPhase = props => {
  const {shape, prompt} = props
  return (
    <div className="card">
      {/* <div className="section flow-text">
        <blockquote>ROUND STARTED</blockquote>
        <p>
          Find a person with the same image that is on your phone below! You
          should discuss the prompt below and write down notes about the{' '}
          <strong>other person's</strong> answer.
        </p>
        <p>We'll let you know when the next round starts!</p>
      </div> */}
      <div className="card-content">
        <div className="card-title">
          <p>
            <strong>Prompt: </strong>
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
