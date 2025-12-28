import { Link, Navigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/comment-form/comment-form.component';
import Header from '../../components/header/header.component';
import ReviewList from '../../components/review/review-list.component';
import Map from '../../components/map/map.component';
import { MapClassName } from '../../const';
import OffersList from '../../components/offer-list/offer-list.component';
import { CardType } from '../../enums/card-type.enum';
import { AppRoute } from '../../types/app-route.type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { clearOfferDetails } from '../../store/slices/offer-details-slice';
import { LoadingScreen } from '../../components/spinner/spinner.component';
import { AuthStatus } from '../../enums/auth-status.enum';
import { selectCurrentOffer, selectNearbyOffers, selectReviews, selectIsOfferLoading, selectHasOfferError, selectAuthStatus, selectOffers } from '../../store/selectors';


export default function Offer(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const isOfferLoading = useAppSelector(selectIsOfferLoading);
  const hasOfferError = useAppSelector(selectHasOfferError);
  const authStatus = useAppSelector(selectAuthStatus);
  const offerCards = useAppSelector(selectOffers);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOfferCard = nearbyOffers.find((offerCard) => offerCard.id === activeOfferId);

  useEffect(() => {
    if (params.id) {
      dispatch(clearOfferDetails());
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchNearbyOffersAction(params.id));
      dispatch(fetchCommentsAction(params.id));
    }
  }, [dispatch, params.id]);

  if (hasOfferError) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isOfferLoading || !currentOffer) {
    return <LoadingScreen />;
  }

  const isAuthorized = authStatus === AuthStatus.Auth;

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
              {currentOffer.images.map((imageLink) => (
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
                <button className={`offer__bookmark-button ${currentOffer.isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
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
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">3 Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max 4 adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {[].map((amenity) => (
                    <li key={amenity} className="offer__inside-item">{amenity}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : 0}</span></h2>
                <ReviewList reviews={reviews}/>
                {isAuthorized && <ReviewForm offerId={currentOffer.id}/>}
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
