import { Modal } from '@resolid-remix/ui';
import { useState } from 'react';
import { useAuthDispatch } from '~/extensions/auth/AuthContext';
import { AuthForgotPasswordForm } from '~/extensions/auth/AuthForgotPasswordForm';
import { AuthLoginForm } from '~/extensions/auth/AuthLoginForm';
import { AuthModalAction, AuthModalDispatchProvider } from '~/extensions/auth/AuthModalContext';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';

export const AuthModal = ({ opened }: { opened: boolean }) => {
  const { resetAction } = useAuthDispatch();
  const [authActionState, setAuthActionState] = useState<AuthModalAction>(AuthModalAction.LOGIN);

  return (
    <Modal.Root opened={opened} closeOnBlur={false} onClose={resetAction}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body className={'w-[30em] p-5'}>
          <AuthModalDispatchProvider value={(action) => setAuthActionState(action)}>
            {authActionState == AuthModalAction.LOGIN && <AuthLoginForm />}
            {authActionState == AuthModalAction.SIGNUP && <AuthSignupForm />}
            {authActionState == AuthModalAction.FORGOT_PASSWORD && <AuthForgotPasswordForm />}
          </AuthModalDispatchProvider>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
