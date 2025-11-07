import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main.page';
import { PrivateRoutes } from '../private-route/private-route.component';
import { AppRoute } from '../../types/app-route.type';
import { PageNotFound } from '../not-found/not-found.component';

type AppProps = {
  cardCount: number;
};

function App({ cardCount }: AppProps): JSX.Element {
  const isAuthorized = false;
  const authorizedRoutes = PrivateRoutes({isAuthorized : isAuthorized});

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={ MainPage({cardCount}) }/>
        <Route path={AppRoute.NotFound} element={ PageNotFound() }/>
        {authorizedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
