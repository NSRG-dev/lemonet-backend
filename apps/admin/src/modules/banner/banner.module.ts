import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { BannerRepository } from './banner.repository';
import { BannerModule as LibBannerModule } from 'libs/banner/src';
import { MediaModule } from '@app/media';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [LibBannerModule, MediaModule, PrismaModule],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository],
})
export class BannerModule {}
