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
}
