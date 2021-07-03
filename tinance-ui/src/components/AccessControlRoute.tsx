import type { RouteProps } from 'react-router-dom';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getToken } from '../utils';

const defaultProps = {
  loginUrl: '/signin',
};

export interface AccessControlRouteProps extends RouteProps {
  path: string;
  loginUrl?: string;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = AccessControlRouteProps & DefaultProps;

export const AccessControlRoute: React.FC<AccessControlRouteProps> = (props) => {
  const { pathname } = useLocation();
  const { path, loginUrl, ...restProps } = props as PropsWithDefault;

  if (!getToken()) {
    return (
      <Redirect
        path={path}
        to={{
          pathname: loginUrl,
          search: `from=${pathname}`,
        }}
      />
    );
  }

  return <Route path={path} {...restProps} />;
};

AccessControlRoute.defaultProps = defaultProps;
