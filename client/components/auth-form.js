import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import SignUpForm from './signup-form'
import LoginForm from './login-form'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const isLogin = name === 'login'
  if (isLogin) {
    return <LoginForm {...props} />
  }
  return <SignUpForm {...props} />
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
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
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
