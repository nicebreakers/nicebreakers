import React from 'react'

const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container">
      <form onSubmit={handleSubmit} name={name}>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="signup-email">Email</label>
            <input
              className="input-field"
              name="email"
              type="text"
              id="signup-email"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="signup-password">Password</label>
            <input
              className="input-field"
              name="password"
              type="password"
              id="signup-password"
            />
          </div>
        </div>
        <div className="row">
          <div className="file-field input-field col s12">
            <div className="btn">
              <span>File</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path" type="text" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="btn waves-effect waves-light" type="submit">
              {displayName}
            </button>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className="row">
        <div className="col s12">
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
