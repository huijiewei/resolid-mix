import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { success } from '~/foundation/http.server';
import { destroySession, getSession } from '~/foundation/session.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  return success(null, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
