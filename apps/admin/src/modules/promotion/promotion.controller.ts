import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionCreateDto } from '@app/promotion/dto/promotion.create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, PermissionGuard } from '@app/common';

@Controller('promotions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async create(@Body() dto: PromotionCreateDto) {
    return this.promotionService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}
