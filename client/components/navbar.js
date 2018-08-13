import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// TODO -- Use an AUTH higher order component.

const LoggedInLinks = props => (
  <span>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <li>
      <a href="#" onClick={props.handleClick}>
        Logout
      </a>
    </li>
  </span>
)

const LoggedOutLinks = props => (
  <span>
    {' '}
    <li>
      {' '}
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/signup">Sign Up</Link>
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
        <ul id="nav-mobile" className="sidenav">
          {props.isLoggedIn ? <LoggedInLinks {...props} /> : <LoggedOutLinks />}
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
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
