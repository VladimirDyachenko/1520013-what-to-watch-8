import { Film } from '../types/film';
import { ThunkActionResult } from '../types/store/action';
import { ApiRoute } from '../utils/const';
import { keysToCamel } from '../utils/snake-to-camel-adapter';
import { setFilmData, setIsDataLoaded, setPromotedFilm } from './action';

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
