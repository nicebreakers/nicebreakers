import React from 'react'

const InstructionPanel = props => (
  <div>
    <button
      className="waves-effect waves-light btn modal-trigger yellow blue-text"
      data-target="instructions-modal"
      type="button"
    >
      I need Instructions!
    </button>

    <div
      id="instructions-modal"
      className="modal"
      ref={() => $('.modal').modal()}
    >
      <div className="modal-content">
        <h4>Getting Started</h4>
        <p>
          {' '}
          Press the orange button in the bottom right corner to create an event{' '}
        </p>
        <p> You're going to need four friends and a leader to do an event.</p>
        <p>
          {' '}
          You can use testParticipant1@email.com and testParticipant2@email.com
          (pw: "789" for both)
        </p>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Got it!
        </a>
      </div>
    </div>
  </div>
)

export default InstructionPanel
