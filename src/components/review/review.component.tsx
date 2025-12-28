import { Review } from '../../types/review.type';

type ReviewComponentProps = {
  review: Review;
};

export default function ReviewComponent({ review }: ReviewComponentProps): JSX.Element {
  const reviewDate = new Date(review.date);
  const formattedDate = reviewDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  if (!review.user) {
    return <li className="reviews__item">Error loading review</li>;
  }

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="User avatar"/>
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `calc(100% / 5 * ${review.rating})`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>{formattedDate}</time>
      </div>
    </li>
  );
}
