import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main.page';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../spinner/spinner.component';
import { HelmetProvider } from 'react-helmet-async';
import LoginPage from '../../pages/login/login.page';
import OfferPage from '../../pages/offer/offer.page';
import { PrivateRoutes } from '../private-route/private-route.component';
import FavoritesPage from '../../pages/favorites/favorites.page';
import { PageNotFound } from '../not-found/not-found.component';
import HistoryRouter from '../history/history-route.component';
import browserHistory from '../../browser-history';

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.areOffersLoading);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path='/' element =
            {
              <MainPage/>
            }
          />
          <Route path='login' element = {<LoginPage/>}/>
          <Route path='offer/:id' element =
            {
              <OfferPage/>
            }
          />
          <Route path='favorites' element =
            {
              <PrivateRoutes>
                <FavoritesPage/>
              </PrivateRoutes>
            }
          />
          <Route path='*' element = {<PageNotFound/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
