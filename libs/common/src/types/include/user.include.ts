import { Prisma } from '@prisma/client';

export const USER_INCLUDE = {
  role: true,
  referedBy: true,
  referals: true,
} satisfies Prisma.UserInclude;
