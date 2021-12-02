import axios from 'axios';
import { dropToken, getToken, setToken } from '../services/token';
import { Comment, CommentPost } from '../types/comment';
import { Film } from '../types/film';
import { ThunkActionResult } from '../types/store/action';
import { CommentsForFilm } from '../types/store/data-process';
import { AuthInfo } from '../types/user';
import { ApiRoute, AppRoute, AuthorizationStatus, HttpCode } from '../utils/const';
import { keysToCamel } from '../utils/snake-to-camel-adapter';
import {
  redirectToRoute,
  setAuthorizationStatus,
  setFavoriteFilms,
  setFilmComments,
  setFilmData,
  setFilmDetails,
  setIsDataLoaded,
  setPromotedFilm,
  setSimilarFilms,
  setUserData
} from './action';

export const fetchFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film[]>(ApiRoute.Films);
    const adaptedData = keysToCamel(data) as Film[];
    dispatch(setFilmData(adaptedData));
  };

export const fetchPromotedFilm = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film>(ApiRoute.Promo);
    const adaptedData = keysToCamel(data) as Film;
    dispatch(setPromotedFilm(adaptedData));
  };

export const fetchInitialData = (): ThunkActionResult =>
  async (dispatch, _getState, _api): Promise<void> => {
    await dispatch(fetchFilms());
    await dispatch(fetchPromotedFilm());

    dispatch(setIsDataLoaded(true));
  };

export const checkLoginStatus = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const token = getToken();

    if (token === '') {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
      dispatch(setUserData(undefined));
      return;
    }

    const { data } = await api.get<AuthInfo>(ApiRoute.Login);
    const adaptedData = keysToCamel(data) as AuthInfo;
    dispatch(setUserData(adaptedData));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
  };

export const loginAction = (login: string, password: string, onServerResponse: (result: 'ok' | 'error') => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<AuthInfo>(ApiRoute.Login, {email: login, password: password});
      const adaptedData = keysToCamel(data) as AuthInfo;
      dispatch(setUserData(adaptedData));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      setToken(adaptedData.token);
      onServerResponse('ok');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(setUserData(undefined));
        dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
        onServerResponse('error');
      }
    }
  };

export const logOutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete<AuthInfo>(ApiRoute.Logout);
      dispatch(setUserData(undefined));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
      dropToken();
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const fetchFilmDetails = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(`${ApiRoute.Films}/${id}`);
      const adaptedData = keysToCamel(data) as Film;
      dispatch(setFilmDetails(adaptedData));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchSimilarFilms = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(`${ApiRoute.Films}/${id}/similar`);
      const adaptedData = keysToCamel(data) as Film[];
      dispatch(setSimilarFilms(adaptedData));
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const addReviewAction = (id: string, review: CommentPost, onSuccess: () => void, onError: () => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post(`${ApiRoute.Comments}/${id}`, review);
      const adaptedData = keysToCamel(data) as Comment[];
      const comments: CommentsForFilm = { filmId: Number(id), comments: adaptedData };
      dispatch(setFilmComments(comments));
      onSuccess();
    } catch (error: unknown) {
      onError();
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const fetchFilmComments = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(`${ApiRoute.Comments}/${id}`);
      const adaptedData = keysToCamel(data) as Comment[];
      const comments: CommentsForFilm = { filmId: Number(id), comments: adaptedData };
      dispatch(setFilmComments(comments));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

export const fetchFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(`${ApiRoute.Favorite}`);
      const adaptedData = keysToCamel(data) as Film[];
      dispatch(setFavoriteFilms(adaptedData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.Unauthorized) {
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      }
    }
  };
