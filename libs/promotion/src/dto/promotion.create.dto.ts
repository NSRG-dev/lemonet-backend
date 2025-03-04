import { ApiProperty } from '@nestjs/swagger';
import { PromotionBaseDto } from './promotion.base.dto';
import { IsString } from 'class-validator';

export class PromotionCreateDto extends PromotionBaseDto {
  @ApiProperty()
  @IsString()
  mediaId: string;
}
