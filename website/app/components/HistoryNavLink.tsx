import { NavLink, type NavLinkProps } from '@remix-run/react';
import { __DEV__ } from '@resolid/mix-utils';
import { forwardRef } from 'react';

export const HistoryNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  const { state, to, ...rest } = props;

  return <NavLink to={to} state={{ ...state, previous: true }} ref={ref} {...rest} />;
});

if (__DEV__) {
  HistoryNavLink.displayName = 'HistoryLink';
}
