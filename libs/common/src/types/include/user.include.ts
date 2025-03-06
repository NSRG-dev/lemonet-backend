import { Prisma } from '@prisma/client';

export const USER_INCLUDE = {
  role: true,
  referedBy: {
    select: {
      id: true,
      username: true,
      email: true,
    },
  },
  referals: {
    select: {
      id: true,
      username: true,
      email: true,
    },
  },
} satisfies Prisma.UserInclude;
