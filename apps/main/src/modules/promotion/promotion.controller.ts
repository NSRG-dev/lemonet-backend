import { PromotionService } from '@app/promotion';
import { PromotionSearchDto } from '@app/promotion/dto/promotion.search.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post('search')
  async search(@Body() query: PromotionSearchDto) {
    return this.promotionService.search(query);
  }
}
