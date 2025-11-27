import { useState } from 'react';
import OffersList from '../../components/offer-list/offer-list.component.tsx';
import Map from '../../components/map/map.component.tsx';
import { DEFAULT_SORT_TYPE, MapClassName } from '../../const.tsx';
import Header from '../../components/header/header.component.tsx';
import { CardType } from '../../enums/card-type.enum.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import CitiesList from '../../components/cities-list/cities-list.component.tsx';
import { changeCity } from '../../store/action.ts';
import SortOptions from '../../components/sort-options/sort-options.component.tsx';
import { SortType } from '../../enums/sort-options.enum.tsx';
import { sortOffersByOption } from '../../utils/offer-sort.util.ts';

export default function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const selectedCityOfferCards = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === selectedCity.name));

  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const selectedOfferCard = selectedCityOfferCards.find((offerCard) => offerCard.id === activeOfferId);

  const [selectedSortType, setCurrentSortType] = useState<SortType>(DEFAULT_SORT_TYPE);
  const sortedOffers = sortOffersByOption(selectedCityOfferCards, selectedSortType);

  const handleSortChange = (sortOption: SortType) => {
    setCurrentSortType(sortOption);
  };

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <Header offerCards={selectedCityOfferCards}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList selectedCity={selectedCity} onCityChange={(city) => dispatch(changeCity(city))}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{selectedCityOfferCards.length} places to stay in {selectedCity.name}</b>
              <SortOptions selectedSortType={selectedSortType} onSortChange={handleSortChange}/>
              <OffersList offerCards={sortedOffers} onActiveOfferChange={setActiveOfferId} cardType={CardType.Regular} />
            </section>
            <div className="cities__right-section">
              <Map
                city={selectedCity}
                offerCards={selectedCityOfferCards}
                selectedOfferCard={selectedOfferCard}
                className={MapClassName.Main}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
