import { FloatingPortal } from '@floating-ui/react';
import { __DEV__ } from '@resolid/mix-utils';
import type { PropsWithChildren } from 'react';

export type PortalProps = {
  id?: string;
  root?: HTMLElement | null;
};

export const Portal = ({ children, id = 're-portal-root', root = null }: PropsWithChildren<PortalProps>) => {
  return (
    <FloatingPortal id={id} root={root}>
      {children}
    </FloatingPortal>
  );
};

if (__DEV__) {
  Portal.displayName = 'Portal';
}
