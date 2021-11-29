import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { fakeFilms as filmData } from './mocks/films';
import { setAuthorizationStatus, setFavoriteFilms, setFilmData } from './store/action';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus } from './utils/const';

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
store.dispatch(setFilmData([...filmData]));
store.dispatch(setFavoriteFilms(filmData.filter((_, index) => index % 2 === 0)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
