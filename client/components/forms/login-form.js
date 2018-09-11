import React from 'react'

const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="container">
      <div className="row">
        <h3>Login</h3>
        <form onSubmit={handleSubmit} name={name}>
          <div className="input-field col s12 l6">
            <label htmlFor="signup-email">Email</label>
            <input name="email" type="text" id="signup-email" />
          </div>
          <div className="input-field col s12 l6">
            <label htmlFor="signup-password">Password</label>
            <input name="password" type="password" id="signup-password" />
          </div>
          <div className="section col s12">
            <button type="submit" className=" btn waves waves-light">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
