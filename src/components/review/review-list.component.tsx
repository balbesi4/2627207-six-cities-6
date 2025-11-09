import ReviewComponent from '../review/review.component';
import { Review } from '../../types/review.type';

type ReviewListProps = {
  reviews: Review[] | undefined;
};

export default function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const sortedByTimeReviews = reviews?.sort((x, y) => x.date.getTime() - y.date.getTime()).slice(0, 10);

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
