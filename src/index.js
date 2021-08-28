import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SlashDBProvider } from './sdk/Context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SlashDBProvider
        baseUrl="https://demo.slashdb.com"
        setUpOptions={{
          dataFormatExt: 'json',
          apikey: 'wwv7nppvsj147rhdbi5mnm1zm8risb53',
        }}
      >
        <App />
      </SlashDBProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
