import axios from 'axios';
import { getToken, setToken } from '../services/token';
import { Film } from '../types/film';
import { ThunkActionResult } from '../types/store/action';
import { AuthInfo } from '../types/user';
import { ApiRoute, AuthorizationStatus } from '../utils/const';
import { keysToCamel } from '../utils/snake-to-camel-adapter';
import { setAuthorizationStatus, setFilmData, setIsDataLoaded, setPromotedFilm, setUserData } from './action';

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
