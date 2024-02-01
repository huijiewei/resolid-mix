import { createContext } from '@resolid/mix-ui';

export enum AuthAction {
  NONE,
  MODAL,
  DIRECT,
}

type AuthDispatchContext = {
  setAction: (action: AuthAction) => void;
  resetAction: () => void;
};

const [AuthDispatchProvider, useAuthDispatch] = createContext<AuthDispatchContext>({
  name: 'AuthDispatchContext',
  strict: true,
});

export { AuthDispatchProvider, useAuthDispatch };
