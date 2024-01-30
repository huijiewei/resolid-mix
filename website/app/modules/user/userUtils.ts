import type { SessionUser } from '~/foundation/session.server';
import type { UserSelect, UserSelectWithGroup } from '~/modules/user/userSchema.server';

export const userIsAdmin = (user: UserSelect | UserSelectWithGroup | SessionUser | null) => {
  return user && user.userGroupId == 1;
};
