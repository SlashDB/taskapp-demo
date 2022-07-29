/**
 * Task List Keeling App.
 * Wrap children with router and provide params for SlashDBProvider.
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { SlashDBProvider } from '@slashdb/react-slashdb';

ReactDOM.render(
  <BrowserRouter>
    <SlashDBProvider
      baseUrl={process.env.REACT_APP_SLASHDB_SERVER_URL}
      setUpOptions={{
        dataFormatExt: 'json',
        apiKey: process.env.REACT_APP_USER_API_KEY,
      }}
    >
      <App />
    </SlashDBProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
