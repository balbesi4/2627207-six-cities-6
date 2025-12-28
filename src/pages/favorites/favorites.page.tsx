import { Link } from 'react-router-dom';
import Header from '../../components/header/header.component';
import OffersList from '../../components/offer-list/offer-list.component';
import { OfferCard } from '../../types/offer-card.type';
import { CardType } from '../../enums/card-type.enum';
import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';
import { selectOffers } from '../../store/selectors';

export function Favorites(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const favoriteOfferCards = useMemo(
    () => offers.filter((offer) => offer.isFavorite),
    [offers]
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const cityToOffers = Object.groupBy((favoriteOfferCards), (offer: OfferCard) => offer.city.name);

  return (
    <body>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <Header offerCards={favoriteOfferCards}/>
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
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="/../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    </body>
  );
}

export default Favorites;
