import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header';
import ListApp from './ListApp';
import Login from './Login';
import Success from './Success';
import { ProtectedRoute } from './ProtectedRoute';
import { useSetUp } from '@slashdb/react-slashdb';


function App() {

  const host = "http://host.docker.internal:8000";	// set SlashDB host here
	const username = "taskapp";	// set SlashDB username here
	const apiKey = "wwv7nppvsj147rhdbi5mnm1zm8risb53";	// set SlashDB API key here
	
  const config = {
		host: host,
		username: username,
		apiKey: apiKey
	}

  // useSetUp();
  useSetUp('default', config);
  
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
