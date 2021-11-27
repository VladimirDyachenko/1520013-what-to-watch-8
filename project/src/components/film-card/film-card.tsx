import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
  onSetActiveFilm: (a: Film | undefined) => void;
}

function FilmCard({ film, onSetActiveFilm }: FilmCardProps): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => onSetActiveFilm(film)}
      onMouseLeave={() => onSetActiveFilm(undefined)}
    >
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{film.name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
