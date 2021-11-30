import { createReducer } from '@reduxjs/toolkit';
import { DataProcess } from '../../types/store/data-process';
import { setFavoriteFilms, setFilmData, setIsDataLoaded, setSelectedGenre } from '../action';

const initialState: DataProcess = {
  films: [],
  selectedGenre: undefined,
  favoriteFilms: [],
  isDataLoaded: false,
};

const dataProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilmData, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setSelectedGenre, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(setIsDataLoaded, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export { dataProcess };
