import { createReducer } from '@reduxjs/toolkit';
import { DataProcess } from '../../types/store/data-process';
import { setFavoriteFilms, setFilmComments, setFilmData, setFilmDetails, setIsDataLoaded, setPromotedFilm, setSelectedGenre, setSimilarFilms } from '../action';

const initialState: DataProcess = {
  films: [],
  selectedGenre: undefined,
  favoriteFilms: [],
  isDataLoaded: false,
  promotedFilm: undefined,
  filmDetails: undefined,
  similarFilms: undefined,
  comments: undefined,
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
    .addCase(setPromotedFilm, (state, action) => {
      state.promotedFilm = action.payload;
    })
    .addCase(setIsDataLoaded, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setFilmDetails, (state, action) => {
      state.filmDetails = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFilmComments, (state, action) => {
      state.comments = action.payload;
    });
});

export { dataProcess };
