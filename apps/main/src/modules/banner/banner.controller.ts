import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BannerService } from '@app/banner';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('banners')
export class BannerController {
  constructor(private readonly service: BannerService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.service.findAll();
  }
}
