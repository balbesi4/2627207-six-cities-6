import React from 'react';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRatingValue] = React.useState<number | null>(null);
  const [review, setReview] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isSubmitButtonActive = rating !== null && review.trim().length >= 50 && !isSubmitting;

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!rating || review.trim().length < 50) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(postCommentAction({
        offerId,
        comment: review.trim(),
        rating,
      })).unwrap();

      setRatingValue(null);
      setReview('');
      toast.success('Отзыв успешно добавлен!');
    } catch (error) {
      toast.error('Не удалось добавить отзыв. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={() => setRatingValue(value)}
              disabled={isSubmitting}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="rating">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isSubmitButtonActive}>
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
