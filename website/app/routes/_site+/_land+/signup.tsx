import { hashSync } from '@node-rs/bcrypt';
import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { getValidatedFormData } from 'remix-hook-form';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { authLoginResolver } from '~/extensions/auth/AuthLoginResolver';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';
import type { AuthSignupFormData } from '~/extensions/auth/AuthSignupResolver';
import { problem, success } from '~/foundation/http.server';
import { commitSession, getSession, omitUser } from '~/foundation/session.server';
import { checkExistByEmail, checkExistByUsername, createUser } from '~/modules/user/userService.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<AuthSignupFormData>(request, authLoginResolver);

  if (errors) {
    return problem(errors);
  }

  if (await checkExistByEmail(data?.email)) {
    return problem({
      email: { message: '电子邮箱已被占用' },
    });
  }

  if (await checkExistByUsername(data?.username)) {
    return problem({
      username: { message: '用户名已被占用' },
    });
  }

  const user = await createUser({
    email: data.email,
    username: data.username,
    password: hashSync(data?.password),
    userGroupId: 2,
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id', user.id);

  return success(omitUser(user), {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Signup() {
  return (
    <>
      <div className={'flex justify-center'}>
        <div className={'mt-10 w-96'}>
          <div className={'flex justify-center'}>
            <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
          </div>
          <AuthSignupForm />
        </div>
      </div>
    </>
  );
}
