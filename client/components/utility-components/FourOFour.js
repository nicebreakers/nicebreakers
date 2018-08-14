import React from 'react'
import {NavLink} from 'react-router-dom'
const FourOFour = props => {
  return (
    <div className="container">
      <div className="row center">
        <h1 className="header">Page Not Found</h1>

        <div className="col s12 m6 offset-m3">
          <img src="https://media.scotchwhisky.com/images/media/9b22ddb0bb40d33c93977c8cd45d5960.jpg" />
        </div>
        <div className="col s12">
          <div className="section">
            <p>
              Uh oh, it looks like the page you're searching for cannot be
              found.
            </p>
            <NavLink to="/">Return to Home </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourOFour
