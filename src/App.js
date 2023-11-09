import React from 'react';
import Header from './components/Header';
import ListApp from './ListApp';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useSetUp } from '@slashdb/react-slashdb';

// function App() {
const App = () =>
{

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
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/app" component={ListApp} />
      </Switch>
    </div>
  );
}

export default App;
