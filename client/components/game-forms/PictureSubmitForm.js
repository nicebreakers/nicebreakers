import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export class PictureSubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: this.props.playerName + '_headshot' || 'myHeadshot',
      submitted: false
    }
  }

  handleImageUpload = async evt => {
    evt.preventDefault()
    try {
      const data = new FormData()
      data.append('file', this.uploadInput.files[0])
      data.append('filename', this.fileName.value)
      const submission = await axios.post('/picSubmit', data)
      this.setState({submitted: true})
    } catch (err) {
      console.log('')
    }
  }
  handleSubmit = evt => {
    evt.default()
    console.log('Submitted')
  }
  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleImageUpload}>
          <label htmlFor="imageUrl"> Player Picture </label>
          <input
            ref={ref => {
              this.uploadInput = ref
            }}
            type="file"
            name="imageUrl"
          />
        </form>
        {this.state.submitted ? (
          <Fragment>
            <p> Picture Submitted! </p>
            <button> Continue </button>
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}
