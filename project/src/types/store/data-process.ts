import { Film } from '../film';

export type DataProcess = {
  films: Film[];
  selectedGenre: string | undefined;
  favoriteFilms: Film[];
  isDataLoaded: boolean;
  promotedFilm: Film | undefined;
  filmDetails: Film | undefined;
  similarFilms: Film[] | undefined;
};
