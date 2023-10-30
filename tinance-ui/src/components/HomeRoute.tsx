import { useMemo } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { getToken } from '../utils';

export interface HomeRouteProps extends RouteProps {
  path: string;
  authedComponent: React.ComponentType;
}

export const HomeRoute: React.FC<HomeRouteProps> = (props) => {
  const { component, authedComponent, path, ...restProps } = props;

  const authed = useMemo(() => {
    return getToken() !== '';
  }, []);

  return <Route path="/" component={authed ? authedComponent : component} {...restProps} />;
};
