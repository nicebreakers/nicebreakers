import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateGameForm from './game-forms/CreateGameForm'
class CreateGamePage extends Component {
  onSubmit = newEvent => {
    console.log('newEvent', newEvent)
  }

  render() {
    return (
      <div>
        <h2> Create a Game</h2>
        <CreateGameForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default CreateGamePage

// const mapDispatchToProps = dispatch => ({
//   submitGame: dispatch()
// })

// export default connect(null, mapDispatchToProps)(CreateGamePage)
