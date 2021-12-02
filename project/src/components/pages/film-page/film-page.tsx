import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { redirectToRoute } from '../../../store/action';
import { fetchFilmDetails, fetchSimilarFilms, toggleFavoriteAction } from '../../../store/api-action';
import { getFilmDetails, getSimilarFilmsWithLimit } from '../../../store/data-process/selector';
import { getIsAuthorized } from '../../../store/user-process/selector';
import { AppRoute } from '../../../utils/const';
import FilmDetailTabs from '../../film-detail-tabs/film-detail-tabs';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Loader from '../../loader/loader';

type RouteParams = {
  id: string;
};

function FilmPage(): JSX.Element {
  const params = useParams<RouteParams>();
  const film = useSelector(getFilmDetails);
  const similarFilms = useSelector(getSimilarFilmsWithLimit);
  const isAuthorized = useSelector(getIsAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (film === undefined || film?.id.toString() !== params.id) {
      dispatch(fetchFilmDetails(params.id));
      dispatch(fetchSimilarFilms(params.id));
    }
  }, [dispatch, film, params.id]);

  const handlePlayClick = useCallback(() => {
    if (film !== undefined) {
      dispatch(redirectToRoute(`${AppRoute.Player}/${film.id}`));
    }
  }, [dispatch, film]);

  const handleMyListClick = useCallback(() => {
    if (film !== undefined) {
      dispatch(toggleFavoriteAction(film.id, film.isFavorite));
    }
  }, [dispatch, film]);

  if (film === undefined || film.id.toString() !== params.id) {
    return (
      <div style={{minHeight: '100vh', display: 'flex'}}>
        <Loader/>
      </div>
    );
  }

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
                  onClick={handlePlayClick}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={handleMyListClick}
                >
                  {film.isFavorite ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    :
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>}
                  <span>My list</span>
                </button>
                {isAuthorized &&
                <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className="btn film-card__button">
                  Add review
                </Link>}
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
        {similarFilms !== undefined &&
          <FilmList
            filmList={similarFilms}
            header={<h2 className="catalog__title">More like this</h2>}
            className='catalog--like-this'
          />}

        <Footer/>
      </div>
    </>
  );
}

export default FilmPage;
