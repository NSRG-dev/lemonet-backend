import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PromotionBaseDto } from './promotion.base.dto';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class PromotionFiltersDto extends PartialType(PromotionBaseDto) {}

export class PromotionSortDto {}

export class PromotionSearchDto extends SearchBaseDto<
  PromotionFiltersDto,
  PromotionSortDto
> {
  @ApiProperty({ type: PromotionFiltersDto })
  @ValidateNested()
  @Type(() => PromotionFiltersDto)
  filters?: PromotionFiltersDto;

  @ApiProperty({ type: PromotionSortDto })
  @ValidateNested()
  @Type(() => PromotionSortDto)
  sorts?: PromotionSortDto;
}
