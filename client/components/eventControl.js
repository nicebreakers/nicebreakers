import React from 'react'

export default class EventControl extends React.Component {
  sendRequestNextRoundEvent = () => {
    //socket code
  }
  sendMoveToReviewEvent = () => {
    //socket code
  }
  sendGameEmitEvent = () => {
    //socket code
  }
  render() {
    return (
      <div className="container">
        <h3 className="heading">Leader Control</h3>
        <br />
        <div className="row">
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendMoveToReviewEvent}
            >
              Start Event
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendRequestNextRoundEvent}
            >
              Next Round
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="btn waves waves-effect"
              type="button"
              onClick={this.sendGameEmitEvent}
            >
              Move To Review
            </button>
          </div>
        </div>
      </div>
    )
  }
}
