import { PropsWithChildren, useState } from 'react';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = PropsWithChildren<{
  filmList: Film[];
}>

function FilmList({filmList, children}: FilmListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeFilm, setActiveFilm] = useState<Film | undefined>(undefined);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {children}

      <div className="catalog__films-list">
        {filmList.map((film) => <FilmCard key={film.id} film={film} onSetActiveFilm={setActiveFilm}/>)}
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default FilmList;
