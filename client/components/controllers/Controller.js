import React, {Component} from 'react'
import PreGameMessenger from './PreGameMessenger'
import GameEnded from './GameEnded'
import PostNotesPhase from './PostNotesPhase'
import NotesPhase from './NotesPhase'
import PromptPhase from './PromptPhase'
import {connect} from 'react-redux'

class Controller extends Component {
  state = {
    value: 0
  }

  componentDidMount() {
    //retrieve picture and url from db or from the public folder
  }

  //temporary (goes through the components until we have sockets in place)
  nextPhase = () => {
    const curr = this.state.value
    let next = (curr + 1) % 5
    this.setState({
      value: next
    })
  }

  checkPhase() {
    const phases = ['PreGame', 'Prompt', 'Notes', 'PostNotes', 'GameEnded']
    const expr = phases[this.state.value]
    switch (expr) {
      case 'PreGame':
        return <PreGameMessenger />
      case 'Prompt':
        return (
          <PromptPhase shape={this.props.shape} prompt={this.props.prompt} />
        )
      case 'Notes':
        return <NotesPhase />
      case 'PostNotes':
        return <PostNotesPhase />
      case 'GameEnded':
        return <GameEnded />
      default:
        return <PreGameMessenger />
    }
  }

  render() {
    const whichComponentToRender = this.checkPhase()
    return (
      <div className="container">
        {whichComponentToRender}
        <button type="button" onClick={() => this.nextPhase()}>
          Next
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shape: '/dumbpics/circle.png',
    prompt: 'This is the prompt'
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
