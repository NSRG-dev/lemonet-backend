import { Prisma } from '@prisma/client';

export const BANNER_INCLUDE = {
  media: {
    include: {
      media: true,
    },
  },
} satisfies Prisma.BannerInclude;
