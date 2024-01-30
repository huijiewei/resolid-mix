import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { getValidatedFormData } from 'remix-hook-form';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { AuthForgotPasswordForm } from '~/extensions/auth/AuthForgotPasswordForm';
import { authLoginResolver, type AuthLoginFormData } from '~/extensions/auth/AuthLoginResolver';
import { problem, success } from '~/foundation/http.server';
import { checkExistByEmail } from '~/modules/user/userService.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<AuthLoginFormData>(request, authLoginResolver);

  if (errors) {
    return problem(errors);
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
