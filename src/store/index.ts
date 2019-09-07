import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;
const middlewares = isDev ? [createLogger()] : [];

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
