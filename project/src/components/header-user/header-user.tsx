import { MouseEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOutAction } from '../../store/api-action';
import { getIsAuthorized, getUserData } from '../../store/user-process/selector';
import { AppRoute } from '../../utils/const';

function HeaderUser(): JSX.Element {
  const isAuthorized = useSelector(getIsAuthorized);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOutClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    dispatch(logOutAction());
  }, [dispatch]);

  const handleAvatarClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    history.push(AppRoute.MyList);
  }, [history]);

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
          <img
            src={userData.avatarUrl}
            alt="User avatar"
            width="63"
            height="63"
            onClick={handleAvatarClick}
          />
        </div>
      </li>
      <li className="user-block__item">
        <a
          href='#never'
          className="user-block__link"
          onClick={handleLogOutClick}
        >
          Sign out
        </a>
      </li>
    </ul>
  );
}

export default HeaderUser;
