import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types/app-route.type.tsx';
import { AuthStatus } from '../../enums/auth-status.enum.tsx';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

export function PrivateRoutes({ authStatus, children } : PrivateRouteProps){
  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}
