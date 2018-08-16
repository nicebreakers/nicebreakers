import React from 'react'

const PromptPhase = props => {
  const {shape, prompt} = props
  return (
    <div>
      <div className="section flow-text">
        <blockquote>ROUND STARTED</blockquote>
        <p>
          Find a person with the same image that is on your phone below! You
          should discuss the prompt below and write down notes about the{' '}
          <strong>other person's</strong> answer.
        </p>
        <p>We'll let you know when the next round starts!</p>
      </div>
      <div className="card">
        <div className="card-image">
          <img src={shape} />
        </div>
        <div className="card-content">
          <p>{prompt}</p>
        </div>
      </div>
    </div>
  )
}

export default PromptPhase
