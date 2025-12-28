import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/offer-card.type';
import { AppRoute } from '../../types/app-route.type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus } from '../../enums/auth-status.enum';
import { logoutAction } from '../../store/api-actions';
import { useMemo, useCallback } from 'react';
import { selectAuthStatus, selectUser } from '../../store/selectors';

type HeaderProps = {
  offerCards: OfferCard[];
};

export default function Header({offerCards}: HeaderProps): JSX.Element {
  const favoriteCount = useMemo(
    () => offerCards.filter((offerCard) => offerCard.isFavorite).length,
    [offerCards]
  );
  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const isAuthorised = authStatus === AuthStatus.Auth;
  const dispatch = useAppDispatch();

  const handleLogout = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthorised &&
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{user?.email}</span>
              <span className="header__favorite-count">{favoriteCount}</span>
            </Link>
          </li>}
        <li className="header__nav-item">
          {isAuthorised ? (
            <Link
              className="header__nav-link"
              onClick={handleLogout}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>) : (
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>)}
        </li>
      </ul>
    </nav>
  );
}
