import { hash } from '@node-rs/bcrypt';
import { redirect, type ActionFunctionArgs } from '@remix-run/server-runtime';
import { getValidatedFormData } from 'remix-hook-form';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';
import { authSignupResolver, type AuthSignupFormData } from '~/extensions/auth/AuthSignupResolver';
import { problem } from '~/foundation/http.server';
import { commitSession, createUserSession } from '~/foundation/session.server';
import { checkExistByEmail, checkExistByUsername, createUser } from '~/modules/user/userService.server';

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<AuthSignupFormData>(request, authSignupResolver);

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
    password: await hash(data?.password.normalize('NFKC')),
    userGroupId: 2,
    createdIp: context.remoteAddress,
  });

  const session = await createUserSession(request, user.id);

  return redirect(new URL(request.url).searchParams.get('redirect') ?? '', {
    headers: {
      'Set-Cookie': await commitSession(session, {
        maxAge: 60 * 60 * 30,
      }),
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
