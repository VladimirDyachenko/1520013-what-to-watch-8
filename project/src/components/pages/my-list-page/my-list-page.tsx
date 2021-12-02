import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteFilms } from '../../../store/api-action';
import { getFavoriteFilms } from '../../../store/data-process/selector';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import Header from '../../header/header';

function MyListPage(): JSX.Element {
  const dispatch = useDispatch();
  const favoriteFilms = useSelector(getFavoriteFilms);

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <div className="user-page">

      <Header type='myList'>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <FilmList filmList={favoriteFilms}/>

      <Footer/>
    </div>
  );
}

export default MyListPage;
