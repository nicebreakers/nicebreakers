import React from 'react'
import {Field, reduxForm, reset} from 'redux-form'
import {connect} from 'react-redux'
import {updateInteractionData} from '../../store'

let NotesPhase = ({pristine, submitting, handleSubmit, myId}) => (
  <div className="row">
    <form className="card col s12" onSubmit={handleSubmit}>
      <div className="card-content">
        <div className="card-title">Your Notes:</div>
        <div className="input-field col s12">
          <Field
            component="textarea"
            id="inputarea"
            name={`${myId}Input`}
            className="materialize-textarea flow-text"
          />
          <label htmlFor="inputarea">
            Tap here to add your notes about your partner!
          </label>
          <button
            className="waves-effect waves-light btn"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
)


const mapStateToProps = state => ({
  initialValues: state.interaction.currentInteraction, //so we get the id etc...
  myId: state.interaction.currentInteraction
    ? state.user.id === state.interaction.currentInteraction.aId ? 'a' : 'b'
    : ''
})

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(updateInteractionData(values))
})

NotesPhase = reduxForm({form: 'controllerInputForm', enableReinitialize: true})(
  NotesPhase
)

NotesPhase = connect(mapStateToProps, mapDispatchToProps)(NotesPhase)

export default NotesPhase
