import React from 'react'
import {Link} from 'react-router-dom'

const CardAdminTools = ({id, type}) => {
  let actionName = ''
  if (type === 'done') actionName = 'remove'
  if (type === 'pending') actionName = 'edit'

  return (
    <div className="card-action right-align">
      <Link to={`/api/events/${id}/${actionName}`} className="deep-orange-text">
        {actionName}
      </Link>
    </div>
  )
}

export default CardAdminTools
