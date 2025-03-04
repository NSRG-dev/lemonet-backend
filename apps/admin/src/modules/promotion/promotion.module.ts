import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionRepository } from './promotion.repository';
import { PrismaModule } from '@app/prisma/prisma.module';
import { PromotionModule as LibPromotionModule } from '@app/promotion';
import { MediaModule } from '@app/media';

@Module({
  imports: [PrismaModule, LibPromotionModule, MediaModule],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository],
})
export class PromotionModule {}
