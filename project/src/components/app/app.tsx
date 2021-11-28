import { promotedFilm } from '../../mocks/promoted-film';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Page404 from '../pages/404/404';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import MyListPage from '../pages/my-list-page/my-list-page';
import FilmPage from '../pages/film-page/film-page';
import AddReviewPage from '../pages/add-review/add-review';
import PlayerPage from '../pages/player-page/player-page';
import PrivateRoute from '../route-components/private-route/private-route';
import { Film } from '../../types/film';

type AppProps = {
  filmData: Film[];
}

function App(props: AppProps): JSX.Element {
  const randomFilm = props.filmData[Math.floor(Math.random() * props.filmData.length)];
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage filmList={props.filmData} promotedFilm={promotedFilm}/>
        </Route>
        <Route path={`${AppRoute.Film}/:id`} exact>
          <FilmPage />
        </Route>
        <Route path={`${AppRoute.Film}/:id${AppRoute.AddReview}`} exact>
          <AddReviewPage film={randomFilm}/>
        </Route>
        <Route path={`${AppRoute.Player}/:id`} exact>
          <PlayerPage film={randomFilm}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <LoginPage />
        </Route>
        <PrivateRoute
          path={AppRoute.MyList}
          exact
          render={() => <MyListPage favoriteFilms={props.filmData}/>}
          isAuthorized
        />
        <Route path="" exact>
          <Page404/>;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
