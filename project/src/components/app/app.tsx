import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Page404 from '../pages/404/404';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import MyListPage from '../pages/my-list-page/my-list-page';
import FilmPage from '../pages/film-page/film-page';
import AddReviewPage from '../pages/add-review/add-review';
import PlayerPage from '../pages/player-page/player-page';
import PrivateRoute from '../route-components/private-route/private-route';
import { useSelector } from 'react-redux';
import { getIsDataLoaded } from '../../store/data-process/selector';
import Loader from '../loader/loader';


function App(): JSX.Element {
  const isLoaded = useSelector(getIsDataLoaded);

  if (!isLoaded) {
    return (
      <div style={{minHeight: '100vh', display: 'flex'}}>
        <Loader/>
      </div>
    );
  }

  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <MainPage />
      </Route>
      <Route path={`${AppRoute.Film}/:id`} exact>
        <FilmPage />
      </Route>
      <Route path={`${AppRoute.Player}/:id`} exact>
        <PlayerPage />
      </Route>
      <Route path={AppRoute.SignIn} exact>
        <LoginPage />
      </Route>
      <PrivateRoute
        path={AppRoute.MyList}
        exact
        render={() => <MyListPage />}
      />
      <PrivateRoute
        path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
        exact
        render={() => <AddReviewPage />}
      />
      <Route path="" exact>
        <Page404/>;
      </Route>
    </Switch>
  );
}

export default App;
