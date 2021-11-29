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
