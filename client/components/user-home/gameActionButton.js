import React from 'react'
import {Link} from 'react-router-dom'

const GameActionButton = props => (
  // The 'ref' here will pass a reference to this div when it is rendered to
  // the function provided.  So here, it just calls some init code for this
  // button using JQuery.  Fun!
  <div
    id="menu"
    className="fixed-action-btn "
    ref={el => $(el).floatingActionButton()}
  >
    <a className="btn-floating btn-large light-blue">
      <i className="large material-icons">add</i>
    </a>
    <ul>
      <li>
        <Link
          to="/games/add"
          className="btn-floating red"
          alt="new dating game"
        >
          <i className="material-icons">favorite</i>
        </Link>
      </li>
      <li>
        <Link to="/games/add" className="btn-floating yellow darken-1">
          <i className="material-icons">business_center</i>
        </Link>
      </li>
      <li>
        <Link to="/games/add" className="btn-floating green">
          <i className="material-icons">group</i>
        </Link>
      </li>
    </ul>
  </div>
)

export default GameActionButton
