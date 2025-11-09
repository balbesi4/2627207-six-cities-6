import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main.page';
import { PrivateRoutes } from '../private-route/private-route.component';
import { AppRoute } from '../../types/app-route.type';
import { PageNotFound } from '../not-found/not-found.component';
import { OfferCard } from '../../types/offer-card.type';
import { Review } from '../../types/review.type';

type AppProps = {
  offerCards: OfferCard[];
  reviews: Review[];
};

function App({ offerCards, reviews }: AppProps): JSX.Element {
  const isAuthorized = false;
  const authorizedRoutes = PrivateRoutes({isAuthorized, offerCards, reviews});

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={ MainPage({offerCards}) }/>
        <Route path={AppRoute.NotFound} element={ PageNotFound() }/>
        {authorizedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
