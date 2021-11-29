import { Link } from 'react-router-dom';

type GenreFilterProps = {
  genres: Array<string>;
  selectedGenre: string | undefined;
}

function GenreFilter({genres, selectedGenre}: GenreFilterProps): JSX.Element {

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${selectedGenre === undefined ? 'catalog__genres-item--active' : ''}`}>
        <Link to={{search: ''}} className="catalog__genres-link">All genres</Link>
      </li>

      {genres.map((genre) => (
        <li
          className={`catalog__genres-item ${selectedGenre === genre ? 'catalog__genres-item--active' : ''}`}
          key={genre}
        >
          <Link
            to={{search: `?genre=${genre}`}}
            className="catalog__genres-link"
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreFilter;
