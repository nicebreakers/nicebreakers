// Make ESLINT happy with materialize global.
/* global M */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {updateUser} from '../../store'
import {connect} from 'react-redux'

let ProfileForm = ({handleSubmit, pristine, submitting, reset}) => (
  <div className="container">
    <h3>User Profile </h3>
    <br />
    <form className="row" onSubmit={handleSubmit}>
      <div className="col s12 m6 input-field">
        <Field name="firstName" component="input" type="text" />
        <label htmlFor="firstName"> First Name </label>
      </div>
      <div className="col s12 m6 input-field">
        <Field name="lastName" component="input" type="text" />
        <label htmlFor="lastName"> Last Name </label>
      </div>
      <div className="col s12 input-field">
        <Field name="email" component="input" type="email" />
        <label htmlFor="email"> Email </label>
      </div>
      {/* TODO: Add admin check */}
      <div className="col s12 input-field">
        <Field
          name="role"
          component="select"
          ref={() => $('select').formSelect()}
        >
          <option disabled>Choose User Role...</option>
          <option value="participant">Event Participant</option>
          <option value="leader">Event Leader</option>
          <option value="admin">Administrator</option>
        </Field>
        <label htmlFor="role">User Role</label>
      </div>
      <div className="col s6 m4 l3 xl2">
        <button
          className="btn waves-effect waves-light"
          disabled={pristine || submitting}
          type="submit"
          // Materialize initialization.
          ref={() => M.updateTextFields()}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
      <div className="col s6 m4 l3 xl2">
        <button
          className="btn brown waves-effect waves-light"
          disabled={pristine || submitting}
          type="button"
          onClick={evt => {
            reset(evt)
            M.updateTextFields()
          }}
        >
          <i className="material-icons right">settings_backup_restore</i>
          Reset
        </button>
      </div>
    </form>
  </div>
)

const mapStateToProps = state => ({
  initialValues: state.user
})

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(updateUser(values))
})

ProfileForm = reduxForm({form: 'profileForm'})(ProfileForm)
ProfileForm = connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

export default ProfileForm
