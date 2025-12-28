import { memo } from 'react';
import { Link } from 'react-router-dom';
import {OfferCard} from '../../types/offer-card.type.tsx';
import { AppRoute } from '../../types/app-route.type.tsx';
import { CardType } from '../../enums/card-type.enum.tsx';
import { OfferCardImageWrapperClass } from '../../const.tsx';

type CardComponentProps = {
  offerCard: OfferCard;
  onHover?: (id: string | null) => void;
  cardType: CardType;
};

function CardComponent({ offerCard, onHover, cardType } : CardComponentProps): JSX.Element {
  return (
    <article className={`${cardType} place-card`} onMouseEnter={() => onHover && onHover(offerCard.id)} onMouseLeave={() => onHover && onHover(null)}>
      {
        offerCard.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${OfferCardImageWrapperClass[cardType]} place-card__image-wrapper`}>
        <Link to={`/offer/${offerCard.id}`}>
          <img
            className="place-card__image"
            src={offerCard.previewImage}
            width={cardType === CardType.Favorites ? 150 : 260}
            height={cardType === CardType.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType === CardType.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offerCard.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <
            button className={`place-card__bookmark-button button ${
              offerCard.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offerCard.isFavorite && 'In bookmarks' || !offerCard.isFavorite && 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offerCard.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offerCard.id}`}>{'There will be offer description'}</Link>
        </h2>
        <p className="place-card__type">{offerCard.type}</p>
      </div>
    </article>
  );
}

export default memo(CardComponent);
