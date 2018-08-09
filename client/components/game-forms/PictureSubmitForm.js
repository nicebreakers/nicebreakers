import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
export default class PictureSubmitForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: this.props.playerName + '_headshot' || 'myHeadshot',
      submitted: false
    }
  }

  handleImageUpload = async evt => {
    evt.preventDefault()
    let data = new FormData()
    data.append('image', this.uploadInput.files[0])
    const image = data.getAll('image')
    console.log('Tester', image)
    const submission = await axios.post(
      '/api/profileSubmissions/picSubmit',
      {image},
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    // data.append('filename', this.fileName.value)
    // try {
    //   data.append('file', this.uploadInput.files[0])
    //   data.append('filename', this.fileName.value)
    //   const submission = await axios.post('/picSubmit', data)
    //   this.setState({submitted: true})
    // } catch (err) {
    //   console.log('')
    // }
  }
  handleSubmit = evt => {
    evt.default()
    console.log('Submitted')
  }
  render() {
    console.log('Pffft')
    return (
      <div>
        <form onSubmit={this.handleImageUpload}>
          <label htmlFor="playerName"> PlayerName </label>
          <label htmlFor="imageUrl"> Player Picture </label>
          <input
            ref={ref => {
              this.uploadInput = ref
            }}
            type="file"
            accept="image/*"
            name="imageUrl"
          />
          <button type="submit"> Go </button>
        </form>
        {this.state.submitted ? (
          <Fragment>
            <p> Picture Submitted! </p>
            <button> Continue </button>
          </Fragment>
        ) : null}
      </div>
    )
  }
}
