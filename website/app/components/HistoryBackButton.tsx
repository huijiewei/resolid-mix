import { useLocation, useNavigate } from '@remix-run/react';
import { Button, type ButtonProps } from '@resolid-remix/ui';
import type { HTMLAttributes } from 'react';

export type BackButtonProps = ButtonProps & { backTo?: string };

export const HistoryBackButton = (props: Omit<HTMLAttributes<HTMLButtonElement> & BackButtonProps, 'children'>) => {
  const { onClick, backTo = '/', ...rest } = props;

  const navigate = useNavigate();
  const { state } = useLocation();

  const historyBack = () => {
    if (state && state.previous) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <Button
      onClick={(e) => {
        onClick && onClick(e);
        historyBack();
      }}
      {...rest}
    >
      返回
    </Button>
  );
};
