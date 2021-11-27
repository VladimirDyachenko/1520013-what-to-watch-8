import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute } from '../../../utils/const';

type PrivateRouteProps = RouteProps & {
  isAuthorized: boolean;
  render: () => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render, isAuthorized } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => isAuthorized ? render() : <Redirect to={AppRoute.SignIn}/>}
    >
    </Route>
  );
}

export default PrivateRoute;
