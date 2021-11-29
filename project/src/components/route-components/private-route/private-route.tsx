import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getIsAuthorized } from '../../../store/user-process/selector';
import { AppRoute } from '../../../utils/const';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render} = props;
  const isAuthorized = useSelector(getIsAuthorized);
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
