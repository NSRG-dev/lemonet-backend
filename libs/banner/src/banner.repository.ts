import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BANNER_INCLUDE } from '@app/common/types/include/banner.include';

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.banner.findMany({
      include: BANNER_INCLUDE,
    });
  }

  async findOneById(id: string) {
    return this.prisma.banner.findUnique({
      where: { id },
      include: BANNER_INCLUDE,
    });
  }

  async existsById(id: string) {
    const result = await this.prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1
        FROM "banners"
        WHERE id = ${id}
      ) as exists
    `;

    return Boolean(result[0].exists);
  }
}
