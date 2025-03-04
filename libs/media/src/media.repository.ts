import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { MediaCreateDto } from './dto/media.create.dto';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: MediaCreateDto & { url: string }) {
    return this.prisma.media.create({
      data: {
        url: data.url,
        type: data.type,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  async existsById(id: string) {
    const count = await this.prisma.media.count({
      where: { id },
    });
    return count > 0;
  }
}
