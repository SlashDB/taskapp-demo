/**
 * Task List Keeling App.
 * Wrap children with router and provide params for SlashDBProvider.
 *
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

import { SlashDBProvider } from '@slashdb/react-slashdb';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <HashRouter basename="/">
    <App />
  </HashRouter>,
  </React.StrictMode>
);