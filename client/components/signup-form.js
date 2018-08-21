import React from 'react'

const SignUpForm = props => {
  const {name, displayName, handleSignup, error} = props
  console.log(props)
  return (
    <div className="container">
      <form onSubmit={handleSignup} name={name}>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" required />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" required />
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
