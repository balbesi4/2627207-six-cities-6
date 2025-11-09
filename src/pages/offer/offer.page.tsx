import { Link, useParams } from 'react-router-dom';
import { PageNotFound } from '../../components/not-found/not-found.component';
import ReviewForm from '../../components/comment-form/comment-form.component';
import { OfferCard } from '../../types/offer-card.type';
import { Review } from '../../types/review.type';
import Header from '../../components/header/header.component';
import ReviewList from '../../components/review/review-list.component';
import Map from '../../components/map/map.component';
import { MapClassName } from '../../const';
import OffersList from '../../components/offer-list/offer-list.component';
import { CardType } from '../../enums/card-type.enum';
import { useState } from 'react';
import { AppRoute } from '../../types/app-route.type';

type OfferPageProps = {
  offerCards: OfferCard[];
  reviews: Review[];
};

export default function Offer({ offerCards, reviews }: OfferPageProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const selectedOfferCard = offerCards.find((offerCard) => offerCard.id === activeOfferId);

  const { id } = useParams<{ id: string }>();
  if (Number.isNaN(Number(id))) {
    return PageNotFound();
  }

  const currentOffer = offerCards.find((offerCard) => offerCard.id === Number(id));
  if (!currentOffer) {
    return PageNotFound();
  }

  const currentOfferReviews = reviews.filter((review) => review.offerId === currentOffer.id)
  const nearbyOffers = offerCards.filter(
    (offerCard) => offerCard.city.name === currentOffer.city.name && offerCard.id !== currentOffer.id
  ).slice(0, 3);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <Header offerCards={offerCards}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.imageLinks.map((imageLink) => (
                <div key={imageLink} className="offer__image-wrapper">
                  <img className="offer__image" src={imageLink} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button ${currentOffer.isInFavorites && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isInFavorites ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `calc(100% / 5 * ${currentOffer.rating})`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.housingType}</li>
                <li className="offer__feature offer__feature--bedrooms">{currentOffer.bedroomsCount} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {currentOffer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.cost}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.amenities.map((amenity) => (
                    <li key={amenity} className="offer__inside-item">{amenity}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.author.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.author.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{currentOffer.author.name}</span>
                  {currentOffer.author.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOfferReviews ? currentOfferReviews.length : 0}</span></h2>
                <ReviewList reviews={currentOfferReviews}/>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            offerCards={nearbyOffers}
            selectedOfferCard={selectedOfferCard}
            className={MapClassName.Offer}
          />
        </section>
        <div className="container">
          <OffersList offerCards={nearbyOffers} cardType={CardType.Nearest} onActiveOfferChange={setActiveOfferId}/>
        </div>
      </main>
    </div>
  );
}
