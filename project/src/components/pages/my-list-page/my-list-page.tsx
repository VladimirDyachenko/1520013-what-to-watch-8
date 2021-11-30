import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavoriteFilms } from '../../../store/data-process/selector';
import { AppRoute } from '../../../utils/const';
import FilmList from '../../film-list/film-list';
import Header from '../../header/header';

function MyListPage(): JSX.Element {
  const favoriteFilms = useSelector(getFavoriteFilms);

  return (
    <div className="user-page">

      <Header type='myList'>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <FilmList filmList={favoriteFilms}/>

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
  );
}

export default MyListPage;
