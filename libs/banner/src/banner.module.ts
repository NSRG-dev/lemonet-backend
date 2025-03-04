import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { PrismaModule } from '@app/prisma/prisma.module';
import { BannerRepository } from './banner.repository';

@Module({
  imports: [PrismaModule],
  providers: [BannerService, BannerRepository],
  exports: [BannerService],
})
export class BannerModule {}
