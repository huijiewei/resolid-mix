import { Form, useSearchParams } from '@remix-run/react';
import { Button, Input } from '@resolid-remix/ui';
import { Controller } from 'react-hook-form';
import { useRemixForm } from 'remix-hook-form';
import { FormError } from '~/components/FormError';
import { HistoryLink } from '~/components/HistoryLink';
import {
  authForgotPasswordResolver,
  type AuthForgotPasswordFormData,
} from '~/extensions/auth/AuthForgotPasswordResolver';
import { AuthModalAction, useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';

export const AuthForgotPasswordForm = () => {
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useRemixForm<AuthForgotPasswordFormData>({
    mode: 'onSubmit',
    resolver: authForgotPasswordResolver,
  });

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'py-3 text-center text-xl font-bold'}>忘记密码</h3>
      <Form className={'flex flex-col gap-6'} onSubmit={handleSubmit} noValidate>
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'email'}>电子邮箱</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.email)}
                type={'email'}
                fullWidth
                placeholder={'电子邮箱'}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.email?.message} />
        </div>
        <div className={'text-center'}>
          <Button fullWidth size={'lg'} type={'submit'}>
            发送
          </Button>
        </div>
      </Form>
      <div className={''}>
        {setAuthModalAction ? (
          <Button onClick={() => setAuthModalAction(AuthModalAction.LOGIN)} variant={'link'}>
            返回登录
          </Button>
        ) : (
          <HistoryLink className={'text-link underline'} to={{ pathname: '/login', search: params.toString() }}>
            返回登录
          </HistoryLink>
        )}
      </div>
    </div>
  );
};
