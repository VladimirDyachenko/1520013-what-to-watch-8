import { Link } from 'react-router-dom';
import { Film } from '../../../types/film';
import { AppRoute } from '../../../utils/const';
import FilmList from '../../film-list/film-list';

type MainPageProps = {
  filmList: Film[]
  promotedFilm: {
    title: string;
    genre: string;
    releaseDate: string;
    poster: string;
    bgImage: string;
  };
};

function MainPage({filmList, promotedFilm}: MainPageProps): JSX.Element {
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promotedFilm.bgImage} alt={promotedFilm.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={'#todo'} className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promotedFilm.poster} alt={promotedFilm.title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promotedFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promotedFilm.genre}</span>
                <span className="film-card__year">{promotedFilm.releaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmList filmList={filmList}>
          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <Link to={{search: '?genre=all'}} className="catalog__genres-link">All genres</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Comedies'}} className="catalog__genres-link">Comedies</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Crime'}} className="catalog__genres-link">Crime</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Documentary'}} className="catalog__genres-link">Documentary</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Dramas'}} className="catalog__genres-link">Dramas</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Horror'}} className="catalog__genres-link">Horror</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Kids&Family'}} className="catalog__genres-link">Kids & Family</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Romance'}} className="catalog__genres-link">Romance</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Sci-Fi'}} className="catalog__genres-link">Sci-Fi</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to={{search: '?genre=Thrillers'}} className="catalog__genres-link">Thrillers</Link>
            </li>
          </ul>
        </FilmList>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
