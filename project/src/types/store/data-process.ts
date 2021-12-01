import { Comment } from '../comment';
import { Film } from '../film';

export type CommentsForFilm = {
  filmId: number;
  comments: Comment[];
}

export type DataProcess = {
  films: Film[];
  selectedGenre: string | undefined;
  favoriteFilms: Film[];
  isDataLoaded: boolean;
  promotedFilm: Film | undefined;
  filmDetails: Film | undefined;
  similarFilms: Film[] | undefined;
  comments: CommentsForFilm | undefined;
};
