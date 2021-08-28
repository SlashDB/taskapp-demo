import React from 'react';
import Header from './components/Header';
import ListApp from './ListApp';
import Login from './Login';
import Test from './Test';

import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/app" component={ListApp} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </div>
  );
}

export default App;
