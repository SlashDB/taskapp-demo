/**
 * Task List Keeling App.
 * Wrap children with router and provide params for SlashDBProvider.
 *
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { SlashDBProvider } from '@slashdb/react-slashdb';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SlashDBProvider
      setUpOptions={{
        host: process.env.REACT_APP_SLASHDB_SERVER_URL,
        apiKey: process.env.REACT_APP_USER_API_KEY
        // sso: {
        //   idpId: process.env.REACT_APP_SLASHDB_IDP,
        //   redirectUri: process.env.REACT_APP_SLASHDB_REDIRECT_URI,
        //   popUp: true
        // }
      }}
    >
    <App />
    </SlashDBProvider>,
  </React.StrictMode>
);