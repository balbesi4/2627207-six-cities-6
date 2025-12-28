import ReviewComponent from '../review/review.component';
import { Review } from '../../types/review.type';

type ReviewListProps = {
  reviews: Review[] | undefined;
};

export default function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const sortedByTimeReviews = reviews && Array.isArray(reviews)
    ? [...reviews].sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime()).slice(0, 10)
    : [];

  return (
    <div>
      {sortedByTimeReviews && sortedByTimeReviews.length > 0 ? (
        <ul className="reviews__list">
          {sortedByTimeReviews.map((review) => (
            <ReviewComponent key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '32px' }}>No reviews available</p>
      )}
    </div>
  );
}
