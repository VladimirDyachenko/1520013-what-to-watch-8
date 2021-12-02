import { Router as BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { createAPI } from './services/api';
import { setAuthorizationStatus } from './store/action';
import { checkLoginStatus, fetchInitialData } from './store/api-action';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus } from './utils/const';
import browserHistory from './browser-history';
import { redirect } from './store/middleware/redirect';

const api = createAPI(
  () => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat([redirect]),
});

store.dispatch(checkLoginStatus());
store.dispatch(fetchInitialData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
