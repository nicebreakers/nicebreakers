import React from 'react'
import {NavLink} from 'react-router-dom'
const FourOFour = props => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <img src="https://media.scotchwhisky.com/images/media/9b22ddb0bb40d33c93977c8cd45d5960.jpg" />
      </div>
      <div className="col s12 m10">
        <div className="card-context">
          <header className="card-title"> Page Not Found </header>
          <p>
            {' '}
            Uh oh, it looks like the page you're searching for cannot be found.{' '}
          </p>
        </div>
        <div className="card-action">
          <NavLink to="/">Return to Home </NavLink>
        </div>
      </div>
    </div>
  )
}

export default FourOFour
