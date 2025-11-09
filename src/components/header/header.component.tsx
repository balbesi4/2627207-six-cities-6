import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/offer-card.type';
import { AppRoute } from '../../types/app-route.type';
import { capitalize } from '../../const';
import { user } from '../../mocks/user';

type HeaderProps = {
  offerCards: OfferCard[];
};

export default function Header({offerCards}: HeaderProps): JSX.Element {
  const favoriteCount = offerCards.filter((offerCard) => offerCard.isInFavorites).length;
  const currentUser = user;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <img className="header__avatar-wrapper user__avatar-wrapper" src={user.avatarUrl}>
            </img>
            <span className="header__user-name user__name">{capitalize(currentUser.email)}</span>
            <span className="header__favorite-count">{favoriteCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
