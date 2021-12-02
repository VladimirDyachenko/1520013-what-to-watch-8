import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { redirectToRoute, setSelectedGenre } from '../../../store/action';
import { getAvailableGenres, getFilmsBySelectedGenre, getPromotedFilm, getSelectedGenre } from '../../../store/data-process/selector';
import { AppRoute } from '../../../utils/const';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import GenreFilter from '../../genre-filter/genre-filter';
import Header from '../../header/header';

function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const filmList = useSelector(getFilmsBySelectedGenre);
  const promotedFilm = useSelector(getPromotedFilm);
  const availableGenres = useSelector(getAvailableGenres);
  const selectedGenre = useSelector(getSelectedGenre);
  const [cardsToShowCount, setCardsToShowCount] = useState(8);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const slicedFilmList = useMemo(() => filmList.slice(0, Math.min(cardsToShowCount, filmList.length)), [filmList, cardsToShowCount]);

  useEffect(() => {
    const genre = new URLSearchParams(location.search).get('genre');
    dispatch(setSelectedGenre(genre || undefined));
    setCardsToShowCount(8);
  }, [location.search, dispatch]);

  useEffect(() => cardsToShowCount >= filmList.length ? setCanLoadMore(false) : setCanLoadMore(true), [filmList, cardsToShowCount]);

  const handleShowMoreClick = useCallback(() => setCardsToShowCount((count) => count + 4), [setCardsToShowCount]);

  const handlePlayClick = useCallback((id: number | undefined) => {
    if (id) {
      dispatch(redirectToRoute(`${AppRoute.Player}/${id}`));
    }
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promotedFilm?.backgroundImage} alt={promotedFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header type="filmPage" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promotedFilm?.posterImage} alt={promotedFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promotedFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promotedFilm?.genre}</span>
                <span className="film-card__year">{promotedFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => handlePlayClick(promotedFilm?.id)}>
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
        <FilmList filmList={slicedFilmList}
          header={
            <h2 className="catalog__title visually-hidden">Catalog</h2>
          }
          footer={
            canLoadMore ?
              <div className="catalog__more">
                <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
              </div> : undefined
          }
        >
          <GenreFilter genres={availableGenres} selectedGenre={selectedGenre}/>
        </FilmList>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
