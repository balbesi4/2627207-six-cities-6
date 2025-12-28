import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types/app-route.type.tsx';
import { AuthStatus } from '../../enums/auth-status.enum.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { selectAuthStatus } from '../../store/selectors.js';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoutes({ children } : PrivateRouteProps){
  const authStatus = useAppSelector(selectAuthStatus);
  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}
