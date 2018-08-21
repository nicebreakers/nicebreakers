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
          Click on an event below, and click 'join event' to wait for your event
          to begin!
        </p>
        <p>
          If you don't see any events, contact the event leader than sent you
          invitation.
        </p>
        <p>
          <strong>
            <em>
              If you are a leader you can create a new event by clicking the
              option in the navbar.
            </em>
          </strong>
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
