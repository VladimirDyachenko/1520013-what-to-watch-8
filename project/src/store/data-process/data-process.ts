import { createReducer } from '@reduxjs/toolkit';
import { DataProcess } from '../../types/store/data-process';
import { setFavoriteFilms, setFilmData, setSelectedGenre } from '../action';

const initialState: DataProcess = {
  films: [],
  selectedGenre: undefined,
  favoriteFilms: [],
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
    });
});

export { dataProcess };
