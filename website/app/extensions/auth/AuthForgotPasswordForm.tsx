import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Form, useSearchParams } from '@remix-run/react';
import { Button, Input } from '@resolid-mix/ui';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useRemixForm } from 'remix-hook-form';
import { FormError } from '~/components/FormError';
import { HistoryLink } from '~/components/HistoryLink';
import {
  authForgotPasswordResolver,
  type AuthForgotPasswordFormData,
} from '~/extensions/auth/AuthForgotPasswordResolver';
import { AuthModalAction, useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';
import { useTypeActionData } from '~/extensions/remix/useData';
import { TurnstileWidget } from '~/extensions/turnstile/TurnstileWidget';
import type { action } from '~/routes/_site+/_land+/forgot-password';

export const AuthForgotPasswordForm = () => {
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);
  const data = useTypeActionData<{ success: boolean }, typeof action>();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useRemixForm<AuthForgotPasswordFormData>({
    mode: 'onSubmit',
    resolver: authForgotPasswordResolver,
  });

  useEffect(() => {
    if (!data?.success) {
      setCaptchaVerified(false);
      captchaRef.current?.reset();
    }
  }, [data]);

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
        <Controller
          name={'token'}
          control={control}
          render={({ field: { onChange } }) => (
            <TurnstileWidget
              ref={captchaRef}
              onSuccess={(token) => {
                onChange(token);
                setCaptchaVerified(true);
              }}
              options={{ responseField: false }}
            />
          )}
        />
        <div className={'text-center'}>
          <Button loading={isSubmitting} disabled={!captchaVerified} fullWidth size={'lg'} type={'submit'}>
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
