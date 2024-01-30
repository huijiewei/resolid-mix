import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, '电子邮箱不能为空').email('无效的电子邮箱'),
  password: z.string().min(6, '密码最少为6位数'),
  rememberMe: z.boolean().default(false),
});

export type AuthLoginFormData = z.infer<typeof schema>;

export const authLoginResolver = zodResolver(schema);
