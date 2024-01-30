import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { getValidatedFormData } from 'remix-hook-form';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { AuthForgotPasswordForm } from '~/extensions/auth/AuthForgotPasswordForm';
import type { AuthForgotPasswordFormData } from '~/extensions/auth/AuthForgotPasswordResolver';
import { authLoginResolver } from '~/extensions/auth/AuthLoginResolver';
import { trunstileVerifyServer } from '~/extensions/turnstile/trunstileVerify.server';
import { problem, success } from '~/foundation/http.server';
import { checkExistByEmail } from '~/modules/user/userService.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<AuthForgotPasswordFormData>(request, authLoginResolver);

  if (errors) {
    return problem(errors);
  }

  const captcha = await trunstileVerifyServer(data?.token);

  if (!captcha.success) {
    return problem({
      captcha: { message: captcha.error ?? '验证码错误' },
    });
  }

  if (!(await checkExistByEmail(data?.email))) {
    return problem({
      email: { message: '邮箱不存在' },
    });
  }

  return success({});
};

export default function ForgotPassword() {
  return (
    <>
      <div className={'flex justify-center'}>
        <div className={'mt-10 w-96'}>
          <div className={'flex justify-center'}>
            <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
          </div>
          <AuthForgotPasswordForm />
        </div>
      </div>
    </>
  );
}
