import { Film } from '../types/film';
import { ThunkActionResult } from '../types/store/action';
import { ApiRoute } from '../utils/const';
import { keysToCamel } from '../utils/snake-to-camel-adapter';
import { setFilmData } from './action';

export const fetchFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film[]>(ApiRoute.Films);
    const adaptedData = keysToCamel(data) as Film[];
    dispatch(setFilmData(adaptedData));
  };
