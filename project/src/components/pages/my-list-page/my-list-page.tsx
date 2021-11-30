import { useSelector } from 'react-redux';
import { getFavoriteFilms } from '../../../store/data-process/selector';
import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer';
import Header from '../../header/header';

function MyListPage(): JSX.Element {
  const favoriteFilms = useSelector(getFavoriteFilms);

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
