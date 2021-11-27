import { Link } from 'react-router-dom';
import { AppRoute } from '../../../utils/const';
import './404.css';

function Page404(): JSX.Element {
  return (
    <div className="wrapper">
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>To Main Page</Link>
    </div>
  );
}

export default Page404;
