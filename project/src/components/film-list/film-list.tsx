import { PropsWithChildren, useState } from 'react';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = PropsWithChildren<{
  filmList: Film[];
  footer?: JSX.Element;
  header?: JSX.Element;
  className?: string;
}>

function FilmList({filmList, children, header, footer, className}: FilmListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeFilm, setActiveFilm] = useState<Film | undefined>(undefined);

  return (
    <section className={`catalog ${className ? className : ''}`}>
      {header}

      {children}

      <div className="catalog__films-list">
        {filmList.map((film) => <FilmCard key={film.id} film={film} onSetActiveFilm={setActiveFilm}/>)}
      </div>

      {footer}
    </section>
  );
}

export default FilmList;
