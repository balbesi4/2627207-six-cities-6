import { Link } from 'react-router-dom';
import Header from '../../components/header/header.component';
import OffersList from '../../components/offer-list/offer-list.component';
import { OfferCard } from '../../types/offer-card.type';
import { CardType } from '../../enums/card-type.enum';

type FavoriteProps = {
  offerCards: OfferCard[];
}

export function Favorites({offerCards}: FavoriteProps): JSX.Element {
  const favorites = offerCards.filter((offerCard) => offerCard.isInFavorites);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const cityToOffers = Object.groupBy((favorites), (offer: OfferCard) => offer.city.name);

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
              <Header offerCards={offerCards}/>
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
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>

                    <div className="favorites__places">
                      <OffersList offerCards={cityOffers} onActiveOfferChange={() => {}} cardType={CardType.Favorites}/>
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
