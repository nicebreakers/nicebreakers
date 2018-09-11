import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me, fetchAllEvents, fetchAllPrompts} from './store'
import EventFormPage from './components/event-create-page'
import EditEventPage from './components/event-edit-page'

import {
  Login,
  Signup,
  UserHome,
  FourOFour,
  LandingPage,
  ProtectedRoute,
  EventControl,
  ProfileForm,
  Controller,
  SingleEventPage,
  ReportsPage
} from './components'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    if (isLoggedIn) this.props.loadEventData()
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Protected Routes */}
        {isLoggedIn && (
          <Switch>
            <ProtectedRoute
              path="/events/create"
              component={EventFormPage}
              condition={isLoggedIn} // TODO: Limit to Leader/Admin
              redirect="/login"
            />
            <ProtectedRoute
              path="/events/:eventId/reports"
              component={ReportsPage}
              condition={isLoggedIn} // TODO: Limit to Leader/Admin
              redirect="/login"
            />
            <ProtectedRoute
              path="/events/:eventId/edit"
              component={EditEventPage}
              condition={isLoggedIn} // TODO: Limit to Leader/Admin
              redirect="/login"
            />
            <ProtectedRoute
              path="/home"
              component={UserHome}
              condition={isLoggedIn}
              redirect="/login"
            />
            <ProtectedRoute
              path="/events/:eventId/console"
              component={EventControl}
              condition={isLoggedIn} // TODO: Limit to Leader/Admin
              redirect="/login"
            />
            <ProtectedRoute
              path="/profile"
              component={ProfileForm}
              condition={isLoggedIn}
              redirect="/login"
            />
            <ProtectedRoute
              path="/events/:eventId/controller"
              component={Controller}
              condition={isLoggedIn}
              redirect="/login"
            />
            <Route
              path="/events/:eventId"
              render={routeProps => <SingleEventPage {...routeProps} />}
            />
          </Switch>
        )}
        {isLoggedIn && <Route exact path="/" component={UserHome} />}
        <Route path="*" component={FourOFour} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({isLoggedIn: !!state.user.id})

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me())
  },
  loadEventData: () => {
    dispatch(fetchAllEvents())
    dispatch(fetchAllPrompts())
  }
})

// Make sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
