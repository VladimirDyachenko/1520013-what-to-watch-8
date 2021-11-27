import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { fakeFilms as filmData } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App filmData={[...filmData]}/>
  </React.StrictMode>,
  document.getElementById('root'));
