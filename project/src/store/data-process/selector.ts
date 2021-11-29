import { createSelector } from 'reselect';
import { Film } from '../../types/film';
import { Store } from '../../types/store/store';
import { NameSpace } from '../root-reducer';

export const getFilmData = (state: Store): Film[] => state[NameSpace.Data].films;

export const getSelectedGenre = (state: Store): string | undefined => state[NameSpace.Data].selectedGenre;

export const getFavoriteFilms = (state: Store): Film[] => state[NameSpace.Data].favoriteFilms;

export const getFilmsBySelectedGenre = createSelector(
  getFilmData,
  getSelectedGenre,
  (films, genre): Film[] => {
    if (genre === undefined) {
      return films;
    }

    return films.filter((film) => film.genre.toLowerCase() === genre.toLowerCase());
  },
);

export const getAvailableGenres = createSelector(
  getFilmData,
  (films): Array<string> => {
    const uniqueGenres: {[key: string]: number} = {};

    for (const film of films) {
      uniqueGenres[film.genre] !== undefined ? uniqueGenres[film.genre]++ : uniqueGenres[film.genre] = 0;
    }

    return Object.keys(uniqueGenres);
  },
);