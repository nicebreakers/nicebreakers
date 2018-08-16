import React, {Component} from 'react'

class NotesPhase extends Component {
  render() {
    const {interactionId, pristine, submitting} = this.props
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" />
            <label htmlFor="textarea1">Textarea</label>
          </div>
        </form>
        <button
          className="waves-effect waves-light btn"
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default NotesPhase
