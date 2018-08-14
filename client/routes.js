import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me, fetchAllEvents} from './store'
import PictureSubmission from './components/game-forms/PictureSubmitPage'
import EventFormPage from './components/event-create-page'
import EditEventPage from './components/event-edit-page'
=======

import {
  Login,
  Signup,
  UserHome,
  FourOFour,
  LandingPage,
  ProtectedRoute
} from './components'
import Controller from './components/controllers/Controller'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/createProfile" component={PictureSubmission} />
        {/* Routes placed here are available to all visitors */}
        <Route path="/events/create" component={EventFormPage} />
        <Route
          path="/events/:eventId/edit"
          render={routeProps => <EditEventPage {...routeProps} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* Protected Routes */}
        <ProtectedRoute
          path="/home"
          component={UserHome}
          condition={isLoggedIn}
          redirect="/login"
        />
        <ProtectedRoute
          path="/controller"
          component={Controller}
          condition={isLoggedIn}
          redirect="/login"
        />
        {isLoggedIn && <Route exact path="/" component={UserHome} />}
        <Route path="*" component={FourOFour} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchAllEvents())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
