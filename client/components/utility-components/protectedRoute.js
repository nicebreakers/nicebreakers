import React from 'react'
import {Route, Redirect} from 'react-router-dom'
/**
 * Will render a route, but only if the condition prop is true
 * @param { component, condition, redirect, path } props
 */
const ProtectedRoute = ({
  component: Comp,
  condition,
  redirect,
  path,
  exact = false
}) => (
  <Route
    exact={exact}
    path={path}
    render={props =>
      condition ? <Comp {...props} /> : <Redirect to={redirect} />
    }
  />
)

export default ProtectedRoute
