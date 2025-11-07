import { Link } from 'react-router-dom';


export function PageNotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <h2>Эта страница не найдена</h2>
      <Link to="/" style={{color: 'coral'}}>Вернуться на главную</Link>
    </div>
  );
}
