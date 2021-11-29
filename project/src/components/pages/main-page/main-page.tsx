import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setSelectedGenre } from '../../../store/action';
import { getAvailableGenres, getFilmsBySelectedGenre, getSelectedGenre } from '../../../store/data-process/selector';
import { AppRoute } from '../../../utils/const';
import FilmList from '../../film-list/film-list';
import GenreFilter from '../../genre-filter/genre-filter';

type MainPageProps = {
  promotedFilm: {
    title: string;
    genre: string;
    releaseDate: string;
    poster: string;
    bgImage: string;
  };
};

function MainPage({promotedFilm}: MainPageProps): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const filmList = useSelector(getFilmsBySelectedGenre);
  const availableGenres = useSelector(getAvailableGenres);
  const selectedGenre = useSelector(getSelectedGenre);

  useEffect(() => {
    const genre = new URLSearchParams(location.search).get('genre');
    dispatch(setSelectedGenre(genre || undefined));

  }, [location.search, dispatch]);

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
        <FilmList filmList={filmList}
          header={
            <h2 className="catalog__title visually-hidden">Catalog</h2>
          }
          footer={
            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          }
        >
          <GenreFilter genres={availableGenres} selectedGenre={selectedGenre}/>
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
