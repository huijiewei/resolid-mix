import { isEmpty } from '@resolid/mix-utils';
import type { SessionUser } from '~/foundation/session.server';
import type { UserSelect, UserSelectWithGroup } from '~/modules/user/userSchema.server';

export const userIsAdmin = (user: UserSelect | UserSelectWithGroup | SessionUser | null) => {
  return user && user.userGroupId == 1;
};

export const userDisplayName = (user: UserSelect | UserSelectWithGroup | SessionUser) => {
  if (!isEmpty(user.nickname)) {
    return user.nickname;
  }

  return user.username;
};
