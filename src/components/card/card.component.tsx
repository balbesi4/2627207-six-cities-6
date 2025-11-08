import { Link } from 'react-router-dom';
import {Card} from '../../types/card.type.tsx';
import { AppRoute } from '../../types/app-route.type.tsx';

type CardComponentProps = Card & {
  onHover?: (id: number | null) => void;
};

export function CardComponent({id, isPremium, imageLink, cost, isInFavorites: isInBookmarks, rating, description, housingType, onHover} : CardComponentProps): JSX.Element {
  return (
    <article className="cities__card place-card" onMouseEnter={() => onHover && onHover(id)} onMouseLeave={() => onHover && onHover(null)}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OffersMain}/${id}`}>
          <img className="place-card__image" src={imageLink} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <
            button className={`place-card__bookmark-button button ${
              isInBookmarks && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isInBookmarks && 'In bookmarks' || !isInBookmarks && 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OffersMain}/${id}`}>{description}</Link>
        </h2>
        <p className="place-card__type">{housingType}</p>
      </div>
    </article>
  );
}

export default CardComponent;
