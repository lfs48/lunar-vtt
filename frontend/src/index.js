import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureAppStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

async function cb() {

  const store = configureAppStore();

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
