import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';
import { ActionType } from '../types/store/action';
import { AuthInfo } from '../types/user';
import { AuthorizationStatus } from '../utils/const';

export const setAuthorizationStatus = createAction(
  ActionType.SetAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const setUserData = createAction(
  ActionType.SetUserData,
  (userData: AuthInfo | undefined) => ({
    payload: userData,
  }),
);

export const setFilmData = createAction(
  ActionType.SetFilmData,
  (films: Film[]) => ({payload: films}),
);

export const setSelectedGenre = createAction(
  ActionType.SetSelectedGenre,
  (genre: string | undefined) => ({payload: genre}),
);

export const setFavoriteFilms = createAction(
  ActionType.SetFavoriteFilms,
  (films: Film[]) => ({payload: films}),
);

export const setIsDataLoaded = createAction(
  ActionType.SetDataLoaded,
  (flag: boolean) => ({payload: flag}),
);

export const setPromotedFilm = createAction(
  ActionType.SetPromotedFilm,
  (film: Film) => ({payload: film}),
);

export const setFilmDetails = createAction(
  ActionType.SetFilmDetails,
  (film: Film) => ({payload: film}),
);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (route: string) => ({payload: route}),
);
