import React from 'react'
import {NavLink} from 'react-router-dom'
const PreGameWaitPage = props => (
  <div className="row">
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content white-text">
          <header className="card-title"> Waiting to begin </header>
          <p>Glad you're ready to begin!</p>
          <p>
            {' '}
            This event will start at {props.event.time} on {props.event.date}{' '}
          </p>
        </div>
        <div className="card-action">
          <NavLink to={'/events/' + props.event.id}>
            {' '}
            You can view the event Here{' '}
          </NavLink>
        </div>
      </div>
    </div>
  </div>
)

export default PreGameWaitPage
