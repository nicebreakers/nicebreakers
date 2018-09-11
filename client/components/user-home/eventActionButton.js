import React from 'react'
import {Link} from 'react-router-dom'

const EventActionButton = () => (
  <div
    id="menu"
    className="fixed-action-btn "
    ref={el => $(el).floatingActionButton()}
  >
    <a className="btn-floating btn-large yellow darken-3">
      <i className="large material-icons">add</i>
    </a>
    <ul>
      <li>
        <Link
          to="/events/create"
          className="btn-floating red"
          alt="new dating game"
        >
          <i className="material-icons">favorite</i>
        </Link>
      </li>
      <li>
        <Link to="/events/create" className="btn-floating yellow darken-1">
          <i className="material-icons">business_center</i>
        </Link>
      </li>
      <li>
        <Link to="/events/create" className="btn-floating green">
          <i className="material-icons">group</i>
        </Link>
      </li>
    </ul>
  </div>
)

export default EventActionButton
