import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { LogInForm } from "./login-form.page";

export default function Login(): JSX.Element {
  const currentCityName = useAppSelector((state) => state.city.name);
  return (
    <body>
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <LogInForm/>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to='/'>
                  <span>{currentCityName}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </body>
  );
}
