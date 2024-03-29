import { Form, useSearchParams } from '@remix-run/react';
import { Button, Checkbox, Input } from '@resolid/mix-ui';
import { Controller } from 'react-hook-form';
import { useRemixForm } from 'remix-hook-form';
import { FormError } from '~/components/FormError';
import { HistoryLink } from '~/components/HistoryLink';
import { authLoginResolver, type AuthLoginFormData } from '~/extensions/auth/AuthLoginResolver';

export const AuthLoginForm = () => {
  const [params] = useSearchParams();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useRemixForm<AuthLoginFormData>({
    mode: 'onSubmit',
    resolver: authLoginResolver,
  });

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'py-3 text-center text-xl font-bold'}>登陆你的账号</h3>
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
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.password?.message} />
        </div>
        <div className={'flex flex-row items-center justify-between'}>
          <Controller
            name={'rememberMe'}
            control={control}
            render={({ field: { name, onChange } }) => (
              <Checkbox id={name} name={name} onChange={onChange}>
                记住我
              </Checkbox>
            )}
          />

          <HistoryLink
            className={'text-link underline'}
            to={{ pathname: '/forgot-password', search: params.toString() }}
          >
            忘记密码
          </HistoryLink>
        </div>
        <div className={'flex flex-row gap-1 text-center'}>
          <Button fullWidth loading={isSubmitting} size={'lg'} type={'submit'}>
            登录
          </Button>
        </div>
      </Form>
      <div className={''}>
        还没有账号?&nbsp;
        <HistoryLink className={'text-link underline'} to={{ pathname: '/signup', search: params.toString() }}>
          注册
        </HistoryLink>
      </div>
    </div>
  );
};
