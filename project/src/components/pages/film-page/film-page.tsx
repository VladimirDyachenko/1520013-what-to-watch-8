import { Link } from 'react-router-dom';
import { fakeFilms } from '../../../mocks/films';
import { Film } from '../../../types/film';
import { AppRoute } from '../../../utils/const';
import FilmDetailTabs from '../../film-detail-tabs/film-detail-tabs';
import FilmList from '../../film-list/film-list';
import Header from '../../header/header';

type FilmPageProps = {
  film: Film;
};

function FilmPage({ film }: FilmPageProps): JSX.Element {
  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film.backgroundImage}
              alt={film.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header type="filmPage"/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>

            <FilmDetailTabs film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmList
          filmList={fakeFilms.slice(0, 4)}
          header={<h2 className="catalog__title">More like this</h2>}
          className='catalog--like-this'
        />

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

export default FilmPage;
