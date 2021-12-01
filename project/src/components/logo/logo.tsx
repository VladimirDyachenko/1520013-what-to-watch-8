import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

type LogoLinkProps = {
  additionalClassName?: string;
}

function Logo(props: LogoLinkProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={`logo__link ${props.additionalClassName}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
