import { Film } from '../film';

export type DataProcess = {
  films: Film[];
  selectedGenre: string | undefined;
  favoriteFilms: Film[];
  isDataLoaded: boolean;
};
