import type { RouteProps } from 'react-router-dom';
import { Redirect, Route, useLocation } from 'react-router-dom';

const defaultProps = {
  isLoggedIn: false,
  canAccess: true,
  loginUrl: '/signin',
  forbiddenUrl: '/403',
};

export interface AccessControlRouteProps extends RouteProps {
  path: string;
  isLoggedIn?: boolean;
  canAccess?: boolean;
  loginUrl?: string;
  forbiddenUrl?: string;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = AccessControlRouteProps & DefaultProps;

export const AccessControlRoute: React.FC<AccessControlRouteProps> = (props) => {
  const { pathname } = useLocation();
  const {
    path,
    isLoggedIn,
    canAccess,
    loginUrl,
    forbiddenUrl,

    ...restProps
  } = props as PropsWithDefault;

  if (!isLoggedIn) {
    return (
      <Redirect
        path={path}
        to={{
          pathname: loginUrl,
          search: `redirect=${pathname}`,
        }}
      />
    );
  }

  if (!canAccess) {
    return (
      <Redirect
        path={path}
        to={{
          pathname: forbiddenUrl,
          search: `redirect=${pathname}`,
        }}
      />
    );
  }

  return <Route path={path} {...restProps} />;
};

AccessControlRoute.defaultProps = defaultProps;
