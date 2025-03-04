import { Injectable, NotFoundException } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PromotionSearchDto } from './dto/promotion.search.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(dto: PromotionSearchDto) {
    const [data, count] = await Promise.all([
      this.promotionRepository.search(dto),
      this.promotionRepository.count(dto),
    ]);

    return { data, count };
  }

  async findOneById(id: string) {
    const promotion = await this.promotionRepository.findOneById(id);
    if (!promotion) {
      throw new NotFoundException(this.i18n.t('errors.promotion.notFound'));
    }
    return promotion;
  }
}
