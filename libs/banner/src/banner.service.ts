import { Injectable, Logger } from '@nestjs/common';
import { BannerRepository } from './banner.repository';

@Injectable()
export class BannerService {
  private readonly logger = new Logger(BannerService.name);

  constructor(private readonly repository: BannerRepository) {}

  async findAll() {
    this.logger.log('Finding all banners in db');
    return this.repository.findAll();
  }
}
