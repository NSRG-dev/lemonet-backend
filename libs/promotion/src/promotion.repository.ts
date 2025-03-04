import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PromotionSearchDto } from './dto/promotion.search.dto';
import { mapSearch, mapPagination } from '@app/prisma';
import { mapSort } from '@app/prisma/map.sort';
import { PROMOTION_INCLUDE } from '@app/common/types/include/promotion.include';

@Injectable()
export class PromotionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: PromotionSearchDto) {
    return this.prisma.promotion.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sorts),
      ...mapPagination(dto.pagination),
      include: PROMOTION_INCLUDE,
    });
  }

  async count(dto: PromotionSearchDto) {
    return this.prisma.promotion.count({
      where: mapSearch(dto.filters),
    });
  }
}
