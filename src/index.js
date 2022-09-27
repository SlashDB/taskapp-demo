/**
 * Task List Keeling App.
 * Wrap children with router and provide params for SlashDBProvider.
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

import { SlashDBProvider } from 'react-slashdb';

ReactDOM.render(
  <HashRouter basename="/">
    <SlashDBProvider
      baseUrl={process.env.REACT_APP_SLASHDB_SERVER_URL}
      setUpOptions={{
        dataFormatExt: 'json',
        username: process.env.REACT_APP_DATABASE_USERNAME,
        //password: process.env.REACT_APP_DATABASE_PASSWORD,
        apiKey: process.env.REACT_APP_USER_API_KEY,
        //apiKey: undefined
      }}
    >
      <App />
    </SlashDBProvider>
  </HashRouter>,
  document.getElementById('root')
);
