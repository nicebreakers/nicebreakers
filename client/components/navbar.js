import React from 'react'
import PropTypes from 'prop-types'
import EventActionButton from './user-home/eventActionButton'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// TODO -- Use an AUTH higher order component.

const LoggedInLinks = props => (
  <span>
    <li>
      <Link to="/home" className="sidenav-close">
        Home
      </Link>
    </li>
    <li>
      <Link to="/profile" className="sidenav-close">
        Profile
      </Link>
    </li>
    <li>
      <a href="#" onClick={props.handleClick} className="sidenav-close">
        Logout
      </a>
    </li>
    <li>
      <EventActionButton />
    </li>
  </span>
)

const LoggedOutLinks = props => (
  <span>
    {' '}
    <li>
      {' '}
      <Link to="/login" className="sidenav-close">
        Login
      </Link>
    </li>
    <li>
      <Link to="/signup" className="sidenav-close">
        Sign Up
      </Link>
    </li>
  </span>
)
const Navbar = props => (
  <div>
    <nav className="light-blue" role="navigation">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo logo-container">
          <i className="material-icons">ac_unit</i>
          <span className="flow-text truncate"> Nicebreakers </span>
        </Link>
        <ul className="right hide-on-med-and-down">
          {props.isLoggedIn ? <LoggedInLinks {...props} /> : <LoggedOutLinks />}
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
    <ul id="nav-mobile" className="sidenav" ref={el => $(el).sidenav()}>
      {props.isLoggedIn ? <LoggedInLinks {...props} /> : <LoggedOutLinks />}
    </ul>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
