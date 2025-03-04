import { BannerCreateDto } from '@app/banner/dto/banner.create.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ mediaId, ...data }: BannerCreateDto) {
    return this.prisma.banner.create({
      data: {
        ...data,
        media: {
          create: {
            mediaId,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.banner.delete({
      where: { id },
    });
  }
}
