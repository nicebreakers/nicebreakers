import React from 'react'

const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="container">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="signup-email">Email</label>
          <input
            className="input-field"
            name="email"
            type="text"
            id="signup-email"
          />
        </div>
        <div>
          <label htmlFor="signup-password">Password</label>
          <input
            className="input-field"
            name="password"
            type="password"
            id="signup-password"
          />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

export default LoginForm
