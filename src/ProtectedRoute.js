import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSetUp, auth}  from 'react-slashdb';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  //redundent call - in case user did not call useSetUp at top level of project
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
