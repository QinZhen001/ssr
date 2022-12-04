import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStoreInstance from './store';
import Routes from './routes';

// 接管后端已经好了的store
const store = createStoreInstance(window?.__PRELOAD_STATE__);

console.log("window.__PRELOAD_STATE__", window?.__PRELOAD_STATE__)


ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);









