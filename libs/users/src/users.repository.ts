import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { BaseRoleEnum } from '@app/common/constants/base-roles.enum';
import { USER_INCLUDE } from '@app/common/types/include/user.include';
import { UserSearchDto } from './dto/user.search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/map.sort';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: USER_INCLUDE,
    });
  }

  async search(dto: UserSearchDto) {
    return this.prisma.user.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sorts),
      ...mapPagination(dto.pagination),
      include: USER_INCLUDE,
    });
  }

  async count(dto: UserSearchDto) {
    return this.prisma.user.count({
      where: mapSearch(dto.filters),
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: USER_INCLUDE,
    });
  }

  async create({ referalCode, ...dto }: UserCreateDto) {
    const referedUser =
      referalCode &&
      (await this.prisma.user.findUnique({
        where: { referalCode },
      }));

    return this.prisma.user.create({
      data: {
        ...dto,
        role: {
          connect: {
            name: BaseRoleEnum.User,
          },
        },
        ...(referedUser
          ? {
              referedBy: {
                connect: { id: referedUser.id },
              },
            }
          : {}),
      },
      include: USER_INCLUDE,
    });
  }

  async existsById(id: string) {
    const result = await this.prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1 
        FROM "users" 
        WHERE id = ${id}
      ) as exists
    `;

    return Boolean(result[0].exists);
  }

  async existsByUsername(username: string) {
    const result = await this.prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1 
        FROM "users" 
        WHERE username = ${username}
      ) as exists
    `;

    return Boolean(result[0].exists);
  }

  async existsByEmail(email: string) {
    const result = await this.prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1 
        FROM "users" 
        WHERE email = ${email}
      ) as exists
    `;

    return Boolean(result[0].exists);
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: USER_INCLUDE,
    });
  }
}
