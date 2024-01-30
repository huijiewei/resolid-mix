import { verifySync } from '@node-rs/bcrypt';
import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { getValidatedFormData } from 'remix-hook-form';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { AuthLoginForm } from '~/extensions/auth/AuthLoginForm';
import { authLoginResolver, type AuthLoginFormData } from '~/extensions/auth/AuthLoginResolver';
import { problem, success } from '~/foundation/http.server';
import { commitSession, createUserSession, omitUser } from '~/foundation/session.server';
import { getUserByEmail } from '~/modules/user/userService.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<AuthLoginFormData>(request, authLoginResolver);

  if (errors) {
    return problem(errors);
  }

  const user = await getUserByEmail(data?.email);

  if (user == null) {
    return problem({
      email: { message: '用户不存在' },
      password: null,
    });
  }

  if (!verifySync(data.password, user.password)) {
    return problem({
      email: null,
      password: { message: '密码错误' },
    });
  }

  const session = await createUserSession(request, user.id);

  return success(omitUser(user), {
    headers: {
      'Set-Cookie': await commitSession(session, {
        maxAge: data?.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 30,
      }),
    },
  });
};

export default function Login() {
  return (
    <>
      <div className={'flex justify-center'}>
        <div className={'mt-10 w-96'}>
          <div className={'flex justify-center'}>
            <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
          </div>
          <AuthLoginForm />
        </div>
      </div>
    </>
  );
}
