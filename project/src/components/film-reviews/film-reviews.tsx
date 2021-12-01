import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchFilmComments } from '../../store/api-action';
import { getFilmCommentsSplitted } from '../../store/data-process/selector';
import { formatDateToComment } from '../../utils/functions';
import Loader from '../loader/loader';

type RouterParams = {
  id: string;
}

function FilmReviews(): JSX.Element {
  const comments = useSelector(getFilmCommentsSplitted);
  const dispatch = useDispatch();
  const params = useParams<RouterParams>();

  useEffect(() => {
    if (comments?.filmId.toString() !== params.id){
      dispatch(fetchFilmComments(params.id));
    }
  }, [dispatch, params.id, comments?.filmId]);

  if (comments === undefined || comments.filmId.toString() !== params.id) {
    return (
      <div className="film-card__reviews film-card__row" style={{paddingTop: '10rem'}}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.left.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{formatDateToComment(comment.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>

      <div className="film-card__reviews-col">
        {comments.right.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{formatDateToComment(comment.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default FilmReviews;
