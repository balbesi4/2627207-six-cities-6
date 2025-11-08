import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main.page';
import { PrivateRoutes } from '../private-route/private-route.component';
import { AppRoute } from '../../types/app-route.type';
import { PageNotFound } from '../not-found/not-found.component';
import { Card } from '../../types/card.type';

type AppProps = {
  offerCards: Card[];
};

function App({ offerCards }: AppProps): JSX.Element {
  const isAuthorized = false;
  const authorizedRoutes = PrivateRoutes({isAuthorized : isAuthorized, offerCards: offerCards});

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
