import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updatedUser} from '../../store'
import axios from 'axios'

class PictureSubmission extends Component {
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
      this.props.submitPhotoToStore(this.props.user, submission.url)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="row">
        <h5> Profile Picture </h5>
        <form
          className="col s9 push-s3 center"
          onSubmit={this.handleImageUpload}
        >
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
            <img
              className="circle col s3 pull-s9"
              src={this.props.user.imageURL}
            />
          </Fragment>
        ) : (
          <img className="circle col s3 pull-s9 " src="media/placeholder.png" />
        )}
      </div>
    )
  }
}

const mapState = state => ({user: state.user})

const mapDispatch = dispatch => ({
  submitPhotoToStore: (user, imageURL) => {
    imageURL = 'pics/' + imageURL
    const userWithPhoto = Object.assign({}, user, {imageURL})
    dispatch(updatedUser(userWithPhoto))
  }
})

export default connect(mapState, mapDispatch)(PictureSubmission)
