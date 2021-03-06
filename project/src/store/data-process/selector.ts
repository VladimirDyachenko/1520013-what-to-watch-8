import { createSelector } from 'reselect';
import { SplittedComments } from '../../types/comment';
import { Film } from '../../types/film';
import { CommentsForFilm } from '../../types/store/data-process';
import { Store } from '../../types/store/store';
import { NameSpace } from '../root-reducer';

export const getFilmData = (state: Store): Film[] => state[NameSpace.Data].films;

export const getSelectedGenre = (state: Store): string | undefined => state[NameSpace.Data].selectedGenre;

export const getFavoriteFilms = (state: Store): Film[] => state[NameSpace.Data].favoriteFilms;

export const getPromotedFilm = (state: Store): Film | undefined => state[NameSpace.Data].promotedFilm;

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

export const getIsDataLoaded = (state: Store): boolean => state[NameSpace.Data].isDataLoaded;

export const getFilmDetails = (state: Store): Film | undefined => state[NameSpace.Data].filmDetails;

export const getSimilarFilms = (state: Store): Film[] | undefined => state[NameSpace.Data].similarFilms;

export const getSimilarFilmsWithLimit = createSelector(
  getSimilarFilms,
  (_, limit = 4) =>  limit,
  (films, limit) => {
    if (films === undefined) {
      return undefined;
    }

    return films.slice(0, limit);
  },
);

export const getFilmComments = (state: Store): CommentsForFilm | undefined => state[NameSpace.Data].comments;

export const getFilmCommentsSplitted = createSelector(
  getFilmComments,
  (commentForFilm) => {
    if (commentForFilm === undefined) {
      return undefined;
    }
    const result: SplittedComments = {
      filmId: commentForFilm.filmId,
      left: [],
      right: [],
    };
    commentForFilm.comments.forEach((comment, index) => index % 2 === 0 ? result.left.unshift(comment) : result.right.unshift(comment));

    return result;
  },
);
