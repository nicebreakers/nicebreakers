import React from 'react'
import {Link} from 'react-router-dom'
import CardAdminTools from './cardAdminTools'

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
  }
}

const GameCard = ({type, title, details, id}) => (
  <div className="col s12 m6 l4 xl3">
    <div className={`card hoverable ${style[type].background}`}>
      <Link to="#">
        <div className={`card-content ${style[type].contentText}`}>
          <span className={`card-title ${style[type].titleText}`}>
            {title ? title : 'Placeholder title'}
          </span>
          <p>{details ? details : 'Placeholder content'}</p>
        </div>
      </Link>
      <CardAdminTools {...{id, type}} />
    </div>
  </div>
)

export default GameCard
