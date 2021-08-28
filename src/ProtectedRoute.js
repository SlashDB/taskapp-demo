import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './sdk/auth';
import { useSetUp } from './sdk/hooks';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  useSetUp();
  return (
    <Route
      {...rest}
      render={(props) => {
        async function checkLogin() {
          if ((await auth.isAuthenticated()) === false) {
            props.history.push('/');
          }
        }
        checkLogin();
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
