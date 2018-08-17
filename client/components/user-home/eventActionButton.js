import React from 'react'
import {Link} from 'react-router-dom'

const EventActionButton = props => (
  // The 'ref' here will pass a reference to this div when it is rendered to
  // the function provided.  So here, it just calls some init code for this
  // button using JQuery.  Fun!

  <div id="menu" className="hover-emitter">
    <Link
      to="/events/create"
      className="btn-floating btn-large yellow darken-3 hover-target"
    >
      <i className="large material-icons">add</i>
    </Link>
    <p className="hover-listener"> Create Event</p>
  </div>
)

export default EventActionButton
