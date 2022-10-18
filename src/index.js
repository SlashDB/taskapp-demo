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
     <SlashDBProvider
       baseUrl={process.env.REACT_APP_SLASHDB_SERVER_URL}
       setUpOptions={{
         username: process.env.REACT_APP_DATABASE_USERNAME,
         //password: process.env.REACT_APP_DATABASE_PASSWORD,
         apiKey: process.env.REACT_APP_USER_API_KEY,
       }}
     >
     <App />
     </SlashDBProvider>
   </HashRouter>,
   </React.StrictMode>
 );