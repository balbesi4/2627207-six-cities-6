import { Navigate, Route} from 'react-router-dom';
import { AppRoute } from '../../types/app-route.type.tsx';
import React from 'react';
import Offer from '../../pages/offer/offer.page.tsx';
import Login from '../../pages/login/login.page.tsx';
import Favorites from '../../pages/favorites/favorites.page.tsx';
import { OfferCard } from '../../types/offer-card.type.tsx';
import { Review } from '../../types/review.type.tsx';


export function PrivateRoutes({isAuthorized, offerCards, reviews} : { isAuthorized: boolean; offerCards: OfferCard[]; reviews: Review[] }){
  if (isAuthorized){
    return (
      <React.Fragment>
        <Route path={AppRoute.Favorites} element={<Favorites offerCards={offerCards} />} />
        <Route path={AppRoute.Offer} element={<Offer offerCards={offerCards} reviews={reviews} />} />
        <Route path={AppRoute.Login} element={<Navigate to={AppRoute.Main} replace />}/>
      </React.Fragment>
    );
  } else{
    return (
      <React.Fragment>
        <Route path={AppRoute.Favorites} element={<Navigate to={AppRoute.Login} replace />} />
        <Route path={AppRoute.Offer} element={<Offer offerCards={offerCards} reviews={reviews} />} />
        <Route path={AppRoute.Login} element={<Login />}/>
      </React.Fragment>
    );
  }
}
