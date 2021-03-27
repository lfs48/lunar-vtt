import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

export default function configureAppStore(preloadedState={}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with middleware
  let middlewares;
  if (process.env.NODE_ENV !== 'production') {
    middlewares = [sagaMiddleware, logger];
  } else {
     middlewares = [sagaMiddleware];
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState
  });

  runSaga(rootSaga);

  return store;
}
