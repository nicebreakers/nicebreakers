import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = props => (
  <div ref={() => $('.parallax').parallax()}>
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container row center">
          <br />
          <div
            style={{opacity: 0.9}}
            className="card-panel z-depth-5 white col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3"
          >
            <h2 className="header center blue-text">Nicebreakers</h2>
            <div className="row center">
              <i className="material-icons large blue-text text-lighten-2">
                ac_unit
              </i>
            </div>
            <div className="row center">
              <h5 className="header col s12 light">meet each other</h5>
            </div>
            <div className="row center">
              <Link
                to="/signup"
                className="btn-large waves-effect waves-light blue lighten-1"
              >
                Get Started
              </Link>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="parallax">
        <img
          src="/media/background-landing-1.jpeg"
          alt="Team members with hands together"
        />
      </div>
    </div>

    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center blue-text darken-text-5">
                <i className="material-icons large">flash_on</i>
              </h2>
              <h5 className="center">Quick Setup</h5>
              <p className="light">
                Enter emails and go--Nicebreakers takes care of the rest, easy
                and seamlessly.
              </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center blue-text darken-text-5">
                <i className="material-icons large">group</i>
              </h2>
              <h5 className="center">Flexible</h5>
              <p className="light">
                We make introductions easy and fun for all sorts of events, from
                networking events, to dating events, to the classroom.
              </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center blue-text darken-text-5">
                <i className="material-icons large">settings</i>
              </h2>
              <h5 className="center">Easy to Use</h5>
              <p className="light">
                No apps, no installs, no extra devices. We use responsive html
                and websockets to create an interactive experience compatible
                with a wide range of devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="parallax-container valign-wrapper"
      style={{height: '300px'}}
    >
      <div className="container">
        <div className="container center">
          <h5 className="header white-text" />
        </div>
      </div>
      <div className="parallax">
        <img src="/media/background-landing-2.jpeg" alt="Analytics" />
      </div>
    </div>

    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 center">
            <h3>
              <i className="mdi-content-send brown-text" />
            </h3>
            <h4>Analytics</h4>
            <p className="left-align light">
              {' '}
              We use analytics to help you find compatible group members and
              help empower them to take the next steps in their relationship!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="parallax-container valign-wrapper">
      <div className="container">
        <div className="container center">
          <h5 className="header white-text">Get the fun started today.</h5>
          <br />
          <div className="row center">
            <Link
              to="/signup"
              className="btn-large waves-effect waves-light blue lighten-1"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="parallax">
        <img
          src="/media/background-landing-3.jpeg"
          alt="Woman holding fireworks"
        />
      </div>
    </div>
  </div>
)

export default LandingPage
