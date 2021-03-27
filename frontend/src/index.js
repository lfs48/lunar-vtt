import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureAppStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css';

async function cb() {

  const store = configureAppStore();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

document.addEventListener("DOMContentLoaded", cb);
