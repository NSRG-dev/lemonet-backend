import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionModule as LibPromotionModule } from '@app/promotion';

@Module({
  imports: [LibPromotionModule],
  controllers: [PromotionController],
})
export class PromotionModule {}
