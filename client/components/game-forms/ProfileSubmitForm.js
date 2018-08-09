/* A form used to submit Player name and Photo


**DEV-QUESTION - How to submit from another person's phone?
*/
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

export class PictureAndNameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  handleNameChange = evt => {
    this.setState = {name: evt.target.value}
  }
  handleSubmit = evt => {
    evt.default()
    console.log('Submitted')
  }
  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.submitProfile}>
          <label htmlFor="name"> Player Name </label>
          <input name="name" type="text" onChange={this.handleNameChange} />
        </form>
      </Fragment>
    )
  }
}
