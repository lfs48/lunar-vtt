import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureAppStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import jwt_decode from 'jwt-decode';

async function cb() {

  const token = localStorage.getItem('jwtToken');
  let preloadedState = {};
  if (token) {
    const user = jwt_decode(token);
    preloadedState = {
      session: {
        loggedIn: true,
        user: user
      }
    };
  }

  const store = configureAppStore(preloadedState);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

document.addEventListener("DOMContentLoaded", cb);
