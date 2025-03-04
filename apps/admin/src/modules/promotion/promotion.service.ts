import { BadRequestException, Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PromotionCreateDto } from '@app/promotion/dto/promotion.create.dto';
import { MediaService } from '@app/media';
import { MediaType } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly mediaService: MediaService,
    private readonly i18n: I18nService,
  ) {}

  async create(dto: PromotionCreateDto) {
    const media = await this.mediaService.findOneById(dto.mediaId);
    if (media.type !== MediaType.PROMOTION) {
      throw new BadRequestException(this.i18n.t('errors.media.invalidType'));
    }
    return this.promotionRepository.create(dto);
  }
}
