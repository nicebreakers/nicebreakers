import React from 'react'
import {Link} from 'react-router-dom'

const CardAdminTools = ({id, type}) => {
  // let actionName = ''
  // if (type === 'done') actionName = 'remove'
  // if (type === 'pending') actionName = 'edit'
  return (
    <div className="card-action right-align">
      <Link to={`/events/${id}/`} className="deep-orange-text">
        See Event Details
      </Link>
      <br />
    </div>
  )
}

export default CardAdminTools
