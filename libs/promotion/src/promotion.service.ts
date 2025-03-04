import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PromotionSearchDto } from './dto/promotion.search.dto';

@Injectable()
export class PromotionService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async search(dto: PromotionSearchDto) {
    const [data, count] = await Promise.all([
      this.promotionRepository.search(dto),
      this.promotionRepository.count(dto),
    ]);

    return { data, count };
  }
}
