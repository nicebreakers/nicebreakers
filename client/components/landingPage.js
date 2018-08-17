import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = props => (
  <div ref={() => $('.parallax').parallax()}>
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container row center">
          <br />
          <div className="card-panel white col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
            <h1 className="header center blue-text">Nicebreakers</h1>
            <div className="row center">
              <i className="material-icons large blue-text text-lighten-2">
                ac_unit
              </i>
            </div>
            <div className="row center">
              <h5 className="header col s12 light">Meet each other.</h5>
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
                <i className="material-icons">flash_on</i>
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
                <i className="material-icons">group</i>
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
                <i className="material-icons">settings</i>
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
    <div className="parallax-container valign-wrapper">
      <div className="container">
        <div className="container center">
          <h5 className="header white-text">
            We use analytics to help you find compatible group members and
            empower them to take the next steps in their relationship!
          </h5>
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
            <h4>Why Nicebreakers</h4>
            <p className="left-align light">Easy to use and free. Try it!</p>
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
