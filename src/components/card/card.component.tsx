import { Link } from 'react-router-dom';
import {OfferCard} from '../../types/offer-card.type.tsx';
import { AppRoute } from '../../types/app-route.type.tsx';
import { CardType } from '../../enums/card-type.enum.tsx';
import { OfferCardImageWrapperClass } from '../../const.tsx';

type CardComponentProps = {
  offerCard: OfferCard;
  onHover?: (id: number | null) => void;
  cardType: CardType;
};

export function CardComponent({ offerCard, onHover, cardType } : CardComponentProps): JSX.Element {
  return (
    <article className={`${cardType} place-card`} onMouseEnter={() => onHover && onHover(offerCard.id)} onMouseLeave={() => onHover && onHover(null)}>
      {
        offerCard.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${OfferCardImageWrapperClass[cardType]} place-card__image-wrapper`}>
        <Link to={`${AppRoute.OffersMain}/${offerCard.id}`}>
          <img
            className="place-card__image"
            src={offerCard.imageLink}
            width={cardType === CardType.Favorites ? 150 : 260}
            height={cardType === CardType.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType === CardType.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offerCard.cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <
            button className={`place-card__bookmark-button button ${
              offerCard.isInFavorites && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offerCard.isInFavorites && 'In bookmarks' || !offerCard.isInFavorites && 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offerCard.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OffersMain}/${offerCard.id}`}>{offerCard.description}</Link>
        </h2>
        <p className="place-card__type">{offerCard.housingType}</p>
      </div>
    </article>
  );
}

export default CardComponent;
