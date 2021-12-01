import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchFilmDetails } from '../../../store/api-action';
import { getFilmDetails } from '../../../store/data-process/selector';
import { AppRoute } from '../../../utils/const';
import AddReviewForm from '../../add-review-form/add-review-form';
import Header from '../../header/header';
import Loader from '../../loader/loader';

type RouteParams = {
  id: string;
};

function AddReviewPage(): JSX.Element {
  const params = useParams<RouteParams>();
  const film = useSelector(getFilmDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (film === undefined || film?.id.toString() !== params.id) {
      dispatch(fetchFilmDetails(params.id));
    }
  }, [dispatch, film, params.id]);

  if (film?.id.toString() !== params.id) {
    return (
      <div style={{minHeight: '100vh', display: 'flex'}}>
        <Loader/>
      </div>
    );
  }

  return (
    <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header type="addReview">
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className="breadcrumbs__link" href="#temp">Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm />

    </section>
  );
}

export default AddReviewPage;
