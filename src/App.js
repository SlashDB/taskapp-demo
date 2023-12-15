import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header';
import ListApp from './ListApp';
import Login from './Login';
import Success from './Success';
import { ProtectedRoute } from './ProtectedRoute';
import { useSetUp } from '@slashdb/react-slashdb';



function App() {
  
  useSetUp();
  
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <ProtectedRoute path="/app">
            <ListApp />
          </ProtectedRoute>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
          
      </div>
    </Router>
  );
}

export default App;
