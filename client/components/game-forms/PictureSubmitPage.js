import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updatedUser} from '../../store'
import axios from 'axios'

class PictureSubmission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  handleImageUpload = async evt => {
    evt.preventDefault()
    try {
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
      console.log(submission)
      this.props.submitPhotoToStore(this.props.user, submission.url)
    } catch (err) {
      console.log(err)
      this.setState({error: true})
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="row">
        <h3> Profile Picture </h3>
        <form className="col s8 center" onSubmit={this.handleImageUpload}>
          <div className="col s6">
            <input
              ref={ref => {
                this.uploadInput = ref
              }}
              type="file"
              accept="image/*"
              name="imageUrl"
            />
          </div>
          <button className="cols s6 btn" type="submit">
            {' '}
            Update Picture{' '}
          </button>
        </form>
        {this.props.user.imageURL ? (
          <Fragment>
            <img className="col s3" src={'pics/' + this.props.user.imageURL} />
          </Fragment>
        ) : (
          <img className="col s3" src="media/placeholder.png" />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  submitPhotoToStore: (user, imageURL) => {
    const userWithPhoto = Object.assign({}, user, {imageURL})
    dispatch(updatedUser(userWithPhoto))
  }
})

export default connect(mapState, mapDispatch)(PictureSubmission)
