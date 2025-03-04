import { Prisma } from '@prisma/client';

export const BANNER_INCLUDE = {
  media: true,
} satisfies Prisma.BannerInclude;
