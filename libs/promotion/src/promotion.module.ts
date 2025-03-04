import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionRepository } from './promotion.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PromotionService, PromotionRepository],
  exports: [PromotionService],
})
export class PromotionModule {}
