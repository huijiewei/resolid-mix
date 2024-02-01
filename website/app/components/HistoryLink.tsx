import { Link, type LinkProps } from '@remix-run/react';
import { __DEV__ } from '@resolid-mix/utils';
import { forwardRef } from 'react';

export const HistoryLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { state, to, ...rest } = props;

  return <Link to={to} state={{ ...state, previous: true }} ref={ref} {...rest} />;
});

if (__DEV__) {
  HistoryLink.displayName = 'HistoryLink';
}
