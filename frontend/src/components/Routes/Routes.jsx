import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';

// Route for components that should only be accessed when unauthenticated, e.g. login form
export const AuthRoute = ({ component: Component, ...rest }) => {

  const {loggedIn} = useSelector( (state) => ({
    loggedIn: state.session.loggedIn
  }));

  return(
    <Route 
      {...rest}
      render={(props) => (
        !loggedIn ? (
          // Render component only if user is unauthenticated
          <Component {...props} />
        ) : (
          // Redirect to dashboard if user is already authenticated
          <Redirect push to="/dashboard" />
        )
      )} />
    );
};

// Route for components that should only be accessed when authenticated, e.g. dashboard
export const ProtectedRoute = ({ component: Component, ...rest }) => {

  const {loggedIn} = useSelector( (state) => ({
    loggedIn: state.session.loggedIn,
  }));

  return(
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
            // Render component only if user is authenticated
            <Component {...props} />
        ) : (
          // Redirect to the landing page if the user is unauthenticated
          <Redirect push to="/" />
        )
      }
    />
  );
};