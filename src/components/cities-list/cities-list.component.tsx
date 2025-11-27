import { Cities } from '../../mocks/cities';
import { City } from '../../types/city.type';

type CitiesListProps = {
  selectedCity: City;
  onCityChange: (city: City) => void;
};

export default function CitiesList({ selectedCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a className={`locations__item-link tabs__item ${city.name === selectedCity.name ? 'tabs__item--active' : ''}`} href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onCityChange(city);
                }}>
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
