import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {updateInteractionData} from '../../store'

let NotesPhase = ({pristine, submitting, handleSubmit, myId}) => (
  <div className="row">
    <form className="card col s12" onSubmit={handleSubmit}>
      <div className="input-field col s12">
        <Field
          component="textarea"
          id="inputarea"
          name={`${myId}Input`}
          className="materialize-textarea"
        />
        <label htmlFor="inputarea">Textarea</label>
        <button
          className="waves-effect waves-light btn"
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
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

NotesPhase = reduxForm({form: 'controllerInputForm'})(NotesPhase)

NotesPhase = connect(mapStateToProps, mapDispatchToProps)(NotesPhase)

export default NotesPhase
