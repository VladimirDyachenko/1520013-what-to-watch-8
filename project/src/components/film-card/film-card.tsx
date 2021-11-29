import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import { AppRoute } from '../../utils/const';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film;
  onSetActiveFilm: (a: Film | undefined) => void;
};

function FilmCard({ film, onSetActiveFilm }: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouseOnCard, setIsMouseOnCard] = useState(false);

  const handleMouseEvent = (filmData: Film | undefined) => {
    onSetActiveFilm(filmData);

    if (filmData !== undefined) {
      setIsMouseOnCard(true);
      return;
    }

    setIsMouseOnCard(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isMouseOnCard) {
        setIsPlaying(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isMouseOnCard]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => handleMouseEvent(film)}
      onMouseLeave={() => handleMouseEvent(undefined)}
    >
      <div className="small-film-card__image">
        {isMouseOnCard
          ? <VideoPlayer src={film.previewVideoLink} poster={film.previewImage} playing={isPlaying} muted />
          : <img src={film.previewImage} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Film}/${film.id}`} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
