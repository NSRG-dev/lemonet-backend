import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerModule as LibBannerModule } from 'libs/banner/src';

@Module({
  imports: [LibBannerModule],
  controllers: [BannerController],
})
export class BannerModule {}
