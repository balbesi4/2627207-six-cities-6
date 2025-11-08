import OffersList from '../../components/offer-list/offer-list.component';
import { Card } from '../../types/card.type';

type FavoriteProps = {
  offerCards: Card[];
}

export function Favorites({offerCards}: FavoriteProps): JSX.Element {
  const favorites = offerCards.filter((offerCard) => offerCard.isInFavorites);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const cityToOffers = Object.groupBy((favorites), (offer: Card) => offer.city);

  return (
    <body>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="/../../../markup/main.html">
                  <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
                {Object.entries(cityToOffers).map(([city, cityOffers = []]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>

                    <div className="favorites__places">
                      <OffersList offerCards={cityOffers}/>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="/../../markup/main.html">
            <img className="footer__logo" src="/../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    </body>
  );
}


export default Favorites;
