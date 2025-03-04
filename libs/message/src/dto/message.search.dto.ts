import { UserBaseDto } from '@app/users/dto/user-base.dto';
import { MessageBaseDto } from './message.base.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { UserFiltersDto } from '@app/users/dto/user.search.dto';

export class MessageFiltersDto extends PartialType(MessageBaseDto) {
  @ApiProperty({ type: UserFiltersDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserFiltersDto)
  sender?: UserFiltersDto;
}

export class MessageSortDto {}

export class MessageSearchDto extends SearchBaseDto<
  MessageFiltersDto,
  MessageSortDto
> {
  @ApiProperty({ type: MessageFiltersDto })
  @ValidateNested()
  @Type(() => MessageFiltersDto)
  filters?: MessageFiltersDto;

  @ApiProperty({ type: MessageSortDto })
  @ValidateNested()
  @Type(() => MessageSortDto)
  sort?: MessageSortDto;
}
