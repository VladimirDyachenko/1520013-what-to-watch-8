import { Film } from '../../types/film';
import { ratingToString } from '../../utils/functions';

type FilmOverviewProps = {
  film: Film;
};

function FilmOverview({film}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingToString(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {film.description}

        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
          Starring: {film.starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}

export default FilmOverview;
