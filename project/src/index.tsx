import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { fakeFilms } from './mocks/films';
import { createAPI } from './services/api';
import { setAuthorizationStatus, setFavoriteFilms } from './store/action';
import { checkLoginStatus, fetchInitialData } from './store/api-action';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus } from './utils/const';

const api = createAPI(
  () => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

store.dispatch(checkLoginStatus());
store.dispatch(fetchInitialData());
store.dispatch(setFavoriteFilms(fakeFilms.filter((_, index) => index % 2 === 0)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
