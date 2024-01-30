import { Form, useSearchParams } from '@remix-run/react';
import { Button, Checkbox, Input } from '@resolid-remix/ui';
import { Controller } from 'react-hook-form';
import { useRemixForm } from 'remix-hook-form';
import { FormError } from '~/components/FormError';
import { HistoryLink } from '~/components/HistoryLink';
import { AuthModalAction, useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';
import { authSignupResolver, type AuthSignupFormData } from '~/extensions/auth/AuthSignupResolver';
import { useAuth, type AuthData } from '~/extensions/auth/useAuth';
import { useTypeActionData } from '~/extensions/remix/useData';
import type { action } from '~/routes/_site+/_land+/signup';

export const AuthSignupForm = () => {
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();
  const data = useTypeActionData<AuthData, typeof action>();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useRemixForm<AuthSignupFormData>({
    mode: 'onSubmit',
    resolver: authSignupResolver,
  });

  useAuth(data, params);

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'py-3 text-center text-xl font-bold'}>注册</h3>
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
                invalid={Boolean(errors.email?.message)}
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
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'username'}>用户名</label>
          <Controller
            name={'username'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.username?.message)}
                fullWidth
                placeholder={'用户名'}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.username?.message} />
        </div>
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'password'}>密码</label>
          <Controller
            name={'password'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.password?.message)}
                type={'password'}
                fullWidth
                placeholder={'密码'}
                autoComplete={'new-password'}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.password?.message} />
        </div>
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'confirmPassword'}>确认密码</label>
          <Controller
            name={'confirmPassword'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.confirmPassword?.message)}
                type={'password'}
                fullWidth
                placeholder={'确认密码'}
                autoComplete={'new-password'}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.confirmPassword?.message} />
        </div>
        <div className={'relative'}>
          <Controller
            name={'agreeTerms'}
            control={control}
            render={({ field: { name, onChange } }) => (
              <Checkbox id={name} name={name} invalid={Boolean(errors.agreeTerms?.message)} onChange={onChange}>
                同意
                <HistoryLink className={'text-link hover:text-link-hovered'} target={'_blank'} to={'/terms-service'}>
                  服务协议
                </HistoryLink>
                并已阅读
                <HistoryLink className={'text-link hover:text-link-hovered'} target={'_blank'} to={'/privacy-policy'}>
                  隐私声明
                </HistoryLink>
              </Checkbox>
            )}
          />
        </div>
        <div className={'text-center'}>
          <Button loading={isSubmitting} size={'lg'} fullWidth type={'submit'}>
            注册
          </Button>
        </div>
      </Form>
      <div className={''}>
        已有账号?&nbsp;
        {setAuthModalAction ? (
          <Button onClick={() => setAuthModalAction(AuthModalAction.LOGIN)} variant={'link'}>
            登录
          </Button>
        ) : (
          <HistoryLink className={'text-link underline'} to={{ pathname: '/login', search: params.toString() }}>
            登录
          </HistoryLink>
        )}
      </div>
    </div>
  );
};
