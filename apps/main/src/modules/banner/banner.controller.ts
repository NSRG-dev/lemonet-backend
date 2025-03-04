import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BannerService } from '@app/banner';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CacheTTLEnum } from '@app/common/constants/cache-ttl.enum';

@Controller('banners')
export class BannerController {
  constructor(private readonly service: BannerService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(CacheTTLEnum.BANNER)
  async findAll() {
    return this.service.findAll();
  }
}
