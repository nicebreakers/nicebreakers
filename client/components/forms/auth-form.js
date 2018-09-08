import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SignUpForm from './signup-form'
import LoginForm from './login-form'

import {auth} from '../../store'

const AuthForm = props =>
  props.name === 'login' ? <LoginForm {...props} /> : <SignUpForm {...props} />

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
})

const mapDispatch = dispatch => ({
  handleSubmit: function(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const userInfo = {
      email: evt.target.email.value,
      password: evt.target.password.value
    }
    dispatch(auth(formName, userInfo))
  },
  handleSignup: function(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const userInfo = {
      email: evt.target.email.value,
      password: evt.target.password.value,
      firstName: evt.target.first_name.value,
      lastName: evt.target.last_name.value
    }
    dispatch(auth(formName, userInfo))
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
