import { zodResolver } from '@hookform/resolvers/zod';
import { isUsername } from '@resolid/mix-utils';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().min(1).max(100).email(),
    username: z
      .string()
      .max(32)
      .refine((v) => isUsername(v)),
    password: z.string().min(6).max(32),
    confirmPassword: z.string().min(6).max(32),
    agreeTerms: z.literal<boolean>(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '密码与确认密码必须相同',
  });

export type AuthSignupFormData = z.infer<typeof schema>;

export const authSignupResolver = zodResolver(schema);
