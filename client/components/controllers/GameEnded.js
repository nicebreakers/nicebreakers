import React from 'react'
import {Link} from 'react-router-dom'

const GameEnded = ({gameEndedMessage}) => (
  <div className="row">
    <div className="section" />
    <div className="card blue-grey darken-1 white-text col s12 l10 xl8 offset-xl2  offset-l1">
      <div className="card-content">
        <span className="card-title">Thank you!</span>
        <p>{gameEndedMessage}</p>
      </div>
      <div className="card-action">
        <Link
          className="btn-flat blue-grey lighten-1 white-text waves waves-light"
          to="/home"
        >
          Go to to home
        </Link>
      </div>
    </div>
  </div>
)

export default GameEnded
