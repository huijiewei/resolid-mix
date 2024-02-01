import { createPath, type Location } from '@remix-run/react';
import { createContext } from '@resolid-mix/ui';
import { omit } from '@resolid-mix/utils';
import type { SessionUser } from '~/foundation/session.server';

type AuthUserDispatchContext = {
  setUser: (user: SessionUser) => void;
  resetUser: () => void;
};

const [AuthUserStateProvider, useAuthUserState] = createContext<SessionUser | null>({
  name: 'AuthUserStateContext',
  strict: true,
});

const [AuthUserDispatchProvider, useAuthUserDispatch] = createContext<AuthUserDispatchContext>({
  name: 'AuthUserDispatchContext',
  strict: true,
});

export { AuthUserDispatchProvider, AuthUserStateProvider, useAuthUserDispatch, useAuthUserState };

export const getLoginTo = (pathname: string, location: Location) => {
  const to = {
    pathname: pathname,
    search: location.search,
  };

  if (
    !location.pathname.endsWith('login') &&
    !location.pathname.endsWith('signup') &&
    !location.pathname.endsWith('forgot-password')
  ) {
    to.search = new URLSearchParams({ redirect: createPath(omit(location, ['hash'])) }).toString();
  }

  return to;
};
