import { PROMOTION_INCLUDE } from '@app/common/types/include/promotion.include';
import { PrismaService } from '@app/prisma/prisma.service';
import { PromotionCreateDto } from '@app/promotion/dto/promotion.create.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromotionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ mediaId, ...dto }: PromotionCreateDto) {
    return this.prisma.promotion.create({
      data: { ...dto, media: { create: { mediaId } } },
      include: PROMOTION_INCLUDE,
    });
  }
}
