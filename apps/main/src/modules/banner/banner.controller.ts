import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BannerService } from '@app/banner';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('banners')
export class BannerController {
  constructor(private readonly service: BannerService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10000)
  async findAll() {
    return this.service.findAll();
  }
}
