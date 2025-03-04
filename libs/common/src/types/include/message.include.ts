import { Prisma } from '@prisma/client';

export const MESSAGE_INCLUDE = {
  sender: {
    select: {
      id: true,
      email: true,
      username: true,
    },
  },
} satisfies Prisma.MessageInclude;
