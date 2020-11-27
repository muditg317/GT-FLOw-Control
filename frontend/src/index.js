import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './assets/styles/index.css';

import { StateProvider } from 'state-management';
import App from 'components/app';



ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
