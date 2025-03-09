import { BadRequestException, Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PromotionCreateDto } from '@app/promotion/dto/promotion.create.dto';
import { MediaService } from '@app/media';
import { MediaType } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PromotionService as LibPromotionService } from '@app/promotion';

@Injectable()
export class PromotionService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly mediaService: MediaService,
    private readonly i18n: I18nService,
    private readonly libPromotionService: LibPromotionService,
  ) {}

  async create(dto: PromotionCreateDto) {
    const media = await this.mediaService.findOneById(dto.mediaId);
    if (media.type !== MediaType.PROMOTION) {
      throw new BadRequestException(this.i18n.t('errors.media.invalidType'));
    }
    return this.promotionRepository.create(dto);
  }

  async delete(id: string) {
    const promotion = await this.libPromotionService.findOneById(id);
    await this.mediaService.deleteObject(promotion.media.url);
    return this.promotionRepository.delete(id);
  }
}
