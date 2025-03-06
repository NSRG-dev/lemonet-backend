import { Prisma } from '@prisma/client';
import { USER_INCLUDE } from './include/user.include';

export type User = Prisma.UserGetPayload<{
  include: typeof USER_INCLUDE;
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
