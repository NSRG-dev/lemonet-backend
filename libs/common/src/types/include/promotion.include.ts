import { Prisma } from '@prisma/client';

export const PROMOTION_INCLUDE = {
  media: true,
} satisfies Prisma.PromotionInclude;
