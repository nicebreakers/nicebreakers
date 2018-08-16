import React from 'react'
import PlayerList from './player-list'
import PlayerAdd from './player-add'

const mockData = {
  location: 'Chicago',
  name: 'A Test Event',
  date: '2018',
  description: 'A Test Event that Tests',
  status: 'Pending',
  Players: [{name: 'John'}, {name: 'Jack'}, {name: 'Jill'}]
}

const SingleEventPage = props => (
  <div className="Container">
    <div className="row">
      <div className="col s12 m6">
        <label> Event Name</label>
        <p> {mockData.name}</p>
      </div>
      <div className="col s12 m6">
        <label> Date of Event </label>
        <p> {mockData.date}</p>
      </div>
    </div>
    <div className="col s12 m6">
      <label> Location</label>
      <p> {mockData.location}</p>
    </div>
    <div className="col s12 m6">
      <label> Event Status </label>
      <p> {mockData.status}</p>
    </div>
    <div>
      <label> Description</label>
      <p> {mockData.description} </p>
    </div>
    <div>
      <PlayerList />
      <p> Add Some Friends </p>
      <PlayerAdd />
    </div>
    <div>
      <button button="button" onClick={() => console.log('Invites Sent')}>
        {' '}
        Send out Invites!{' '}
      </button>
    </div>
  </div>
)

export default SingleEventPage
