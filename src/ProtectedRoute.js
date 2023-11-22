import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { auth }  from '@slashdb/react-slashdb';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    auth.clientIsAuthenticated().then(isAuthenticated => {
      setIsAuthenticated(isAuthenticated);
    });
  }, []);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
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

}
