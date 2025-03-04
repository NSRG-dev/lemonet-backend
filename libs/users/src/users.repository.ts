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

  async create(dto: UserCreateDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        role: {
          connect: {
            name: BaseRoleEnum.User,
          },
        },
      },
      include: USER_INCLUDE,
    });
  }

  async existsById(id: string) {
    const result = await this.prisma.user.count({
      where: { id },
    });

    return result > 0;
  }

  async existsByUsername(username: string) {
    const result = await this.prisma.user.count({
      where: { username },
    });

    return result > 0;
  }

  async existsByEmail(email: string) {
    const result = await this.prisma.user.count({
      where: { email },
    });

    return result > 0;
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: USER_INCLUDE,
    });
  }
}
