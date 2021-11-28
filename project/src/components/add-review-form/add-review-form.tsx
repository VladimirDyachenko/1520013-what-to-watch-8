import { ChangeEvent, FormEvent, useState } from 'react';

function AddReviewForm(): JSX.Element {
  const [rating, setRating] = useState<undefined | string>(undefined);
  const [comment, setComment] = useState<undefined | string>(undefined);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <fieldset style={{border: '0', padding: '0', margin: '0'}}>
          <div className="rating">
            <div className="rating__stars">
              <input onChange={handleRadioChange} className="rating__input" id="star-10" type="radio" name="rating" value="10" checked={rating === '10'} />
              <label className="rating__label" htmlFor="star-10">Rating 10</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-9" type="radio" name="rating" value="9" checked={rating === '9'}/>
              <label className="rating__label" htmlFor="star-9">Rating 9</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-8" type="radio" name="rating" value="8" checked={rating === '8'}/>
              <label className="rating__label" htmlFor="star-8">Rating 8</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-7" type="radio" name="rating" value="7" checked={rating === '7'}/>
              <label className="rating__label" htmlFor="star-7">Rating 7</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-6" type="radio" name="rating" value="6" checked={rating === '6'}/>
              <label className="rating__label" htmlFor="star-6">Rating 6</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={rating === '5'}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={rating === '4'}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={rating === '3'}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={rating === '2'}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input onChange={handleRadioChange} className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={rating === '1'}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={comment}
              onChange={handleTextareaChange}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddReviewForm;
