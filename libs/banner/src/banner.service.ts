import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BannerRepository } from './banner.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class BannerService {
  private readonly logger = new Logger(BannerService.name);

  constructor(
    private readonly repository: BannerRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll() {
    this.logger.log('Finding all banners in db');
    return this.repository.findAll();
  }

  async findOneById(id: string) {
    this.logger.log('Finding banner by id in db');
    const banner = await this.repository.findOneById(id);
    if (!banner) {
      throw new NotFoundException(this.i18n.t('errors.banner.notFound'));
    }
    return banner;
  }

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.banner.notFound'));
    }
  }
}
