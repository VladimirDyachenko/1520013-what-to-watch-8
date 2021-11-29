import { useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Film } from '../../types/film';
import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';

type FilmDetailTabsProps = {
  film: Film;
};

function FilmDetailTabs(props: FilmDetailTabsProps): JSX.Element {
  const { film } = props;
  const currentLocation = useLocation();

  const history = useHistory();

  useEffect(() => {
    if (history.location.hash === '') {
      history.push('#overview');
    }
  });

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <NavLink
              to={{hash: 'overview'}}
              className="film-nav__link"
              activeClassName={'film-nav__link--active'}
              isActive={(_, location) => location.hash === '#overview'}
            >
              Overview
            </NavLink>
          </li>
          <li className="film-nav__item">
            <NavLink
              to={{hash: 'details'}}
              className="film-nav__link"
              activeClassName={'film-nav__link--active'}
              isActive={(_, location) => location.hash === '#details'}
            >
              Details
            </NavLink>
          </li>
          <li className="film-nav__item">
            <NavLink
              to={{hash: 'reviews'}}
              className="film-nav__link"
              activeClassName={'film-nav__link--active'}
              isActive={(_, location) => location.hash === '#reviews'}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>

      {currentLocation.hash === '' && <FilmOverview film={film}/>}
      {currentLocation.hash === '#overview' && <FilmOverview film={film}/>}
      {currentLocation.hash === '#details' && <FilmDetails film={film}/>}
      {currentLocation.hash === '#reviews' && <FilmReviews/>}
    </div>
  );
}

export default FilmDetailTabs;
