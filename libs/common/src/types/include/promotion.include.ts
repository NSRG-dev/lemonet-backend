import { Prisma } from '@prisma/client';

export const PROMOTION_INCLUDE = {
  media: {
    include: {
      media: true,
    },
  },
} satisfies Prisma.PromotionInclude;
