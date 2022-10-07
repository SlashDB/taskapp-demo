import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { auth }  from '@slashdb/react-slashdb';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {
        async function checkLogin() {
          //if ((await auth.isAuthenticated()) === false) {
          if (auth.authenticated === false) {
            props.history.push('/');
          }
        }
        checkLogin();
        //if (auth.isAuthenticated()) {
        if (auth.authenticated) {
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
