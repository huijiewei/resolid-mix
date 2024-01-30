import { resolvePath, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { useAuthDispatch } from '~/extensions/auth/AuthContext';
import { useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';
import { useAuthUserDispatch } from '~/extensions/auth/AuthUserContext';
import type { SessionUser } from '~/foundation/session.server';

export type AuthData = {
  success: boolean;
  data?: SessionUser;
};

export const useAuth = (data: AuthData, params: URLSearchParams) => {
  const setAuthModalAction = useAuthModalDispatch();
  const { resetAction } = useAuthDispatch();
  const { setUser } = useAuthUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.success && data.data) {
      setUser(data.data);

      if (setAuthModalAction) {
        resetAction();
      } else {
        navigate(params.get('redirect') ? resolvePath(params.get('redirect') as string) : '', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
