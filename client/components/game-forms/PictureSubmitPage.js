import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export default class PictureSubmission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: '',
      submitted: false
    }
  }

  handleImageUpload = async evt => {
    evt.preventDefault()
    let data = new FormData()
    data.append('image', this.uploadInput.files[0])
    const {data: submission} = await axios.post(
      '/api/profileSubmissions/picSubmit',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    this.setState({imageUrl: submission.url, submitted: true})
  }
  render() {
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
            <img src={'pics/' + this.state.imageUrl} />
            <p> Picture Submitted! </p>
          </Fragment>
        ) : null}
      </div>
    )
  }
}
