import React from 'react'
import {connect} from 'react-redux'
import {fetchParticipants} from '../store/participantsReducer'

export class CreateGamePage extends React.Component {
  constructor() {
    super()
    this.state = {
      participantEntries: ''
    }
  }
  handleSubmit = evt => {
    evt.preventDefault()
    const participants = this.state.participantEntries
      .split('\n')
      .filter(entry => !!entry)
    this.props.submitParticipants(participants)
  }
  handleChange = evt => {
    this.setState({participantEntries: evt.target.value})
  }
  render() {
    return (
      <div>
        <header> Participants </header>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={this.handleChange}
            value={this.state.participantEntries}
            placeholder="Please place one participant for each line"
          />
          <button type="submit"> Submit Participants </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  submitParticipants: participants => {
    dispatch(fetchParticipants(participants))
  }
})

export default connect(null, mapDispatch)(CreateGamePage)
