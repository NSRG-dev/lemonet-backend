import { BannerCreateDto } from '@app/banner/dto/banner.create.dto';
import { MediaService } from '@app/media';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BannerRepository } from './banner.repository';
import { MediaType } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { BannerService as LibBannerService } from '@app/banner';

@Injectable()
export class BannerService {
  constructor(
    private readonly mediaService: MediaService,
    private readonly repository: BannerRepository,
    private readonly i18n: I18nService,
    private readonly libBannerService: LibBannerService,
  ) {}

  async create(data: BannerCreateDto) {
    const media = await this.mediaService.findOneById(data.mediaId);

    if (media.type !== MediaType.BANNER) {
      throw new BadRequestException(this.i18n.t('errors.banner.invalidMedia'));
    }

    return this.repository.create(data);
  }

  async delete(id: string) {
    const banner = await this.libBannerService.findOneById(id);
    await this.mediaService.deleteObject(banner.media.url);
    return this.repository.delete(id);
  }
}
