import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsAuthorized, getUserData } from '../../store/user-process/selector';
import { AppRoute } from '../../utils/const';

function HeaderUser(): JSX.Element {
  const isAuthorized = useSelector(getIsAuthorized);
  const userData = useSelector(getUserData);


  if (!isAuthorized || userData === undefined) {
    return (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to={'#TODO'} className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}

export default HeaderUser;
