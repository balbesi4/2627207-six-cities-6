import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main.page';
import { PrivateRoutes } from '../private-route/private-route.component';
import { AppRoute } from '../../types/app-route.type';
import { PageNotFound } from '../not-found/not-found.component';
import { OfferCard } from '../../types/offer-card.type';
import { Review } from '../../types/review.type';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { loadOffers } from '../../store/action';

type AppProps = {
  offerCards: OfferCard[];
  reviews: Review[];
};

function App({ offerCards, reviews }: AppProps): JSX.Element {
  const isAuthorized = false;
  const authorizedRoutes = PrivateRoutes({isAuthorized, offerCards, reviews});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers(offerCards));
  }, [dispatch, offerCards]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={ MainPage() }/>
        <Route path={AppRoute.NotFound} element={ PageNotFound() }/>
        {authorizedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
