import React from 'react'
import {Link} from 'react-router-dom'

const style = {
  pending: {
    background: 'light-blue lighten-5',
    titleText: 'black-text',
    contentText: 'black-text'
  },
  done: {
    background: 'blue-grey darken-1',
    titleText: 'white-text',
    contentText: 'grey-text text-lighten-2'
  },
  in_progress: {
    background: 'green lighten-3',
    titleText: 'black-text',
    contentText: 'black-text'
  }
}

const EventCard = ({type, title, details, id}) => (
  <div className="col s12 m6 l4 xl3">
    <div className={`card hoverable medium ${style[type].background}`}>
      <Link to={`/events/${id}/`}>
        <div className={`card-content ${style[type].contentText}`}>
          <span className={`card-title ${style[type].titleText}`}>{title}</span>
          <p>{details}</p>
        </div>
      </Link>
      <div className="card-action right-align">Go to Event</div>
    </div>
  </div>
)

export default EventCard
