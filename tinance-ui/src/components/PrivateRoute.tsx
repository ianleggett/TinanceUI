import { useMemo } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getToken } from '../utils';

const defaultProps = {
  loginUrl: '/signin',
};

export interface PrivateRouteProps extends RouteProps {
  path: string;
  loginUrl?: string;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = PrivateRouteProps & DefaultProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { pathname } = useLocation();
  const { loginUrl, path, ...restProps } = props as PropsWithDefault;

  const authed = useMemo(() => {
    return getToken() !== '';
  }, []);

  return authed ? (
    <Route path={path} {...restProps} />
  ) : (
    <Redirect
      path={path}
      to={{
        pathname: loginUrl,
        search: `from=${pathname}`,
      }}
    />
  );
};

PrivateRoute.defaultProps = defaultProps;
