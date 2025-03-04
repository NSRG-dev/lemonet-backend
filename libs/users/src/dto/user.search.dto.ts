import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UserFiltersDto extends PartialType(
  OmitType(UserBaseDto, ['password']),
) {}

export class UserSortDto {}

export class UserSearchDto extends SearchBaseDto<UserFiltersDto, UserSortDto> {
  @ApiProperty({
    type: UserFiltersDto,
  })
  @Type(() => UserFiltersDto)
  @ValidateNested()
  filters?: UserFiltersDto;

  @ApiProperty({ type: UserSortDto })
  @Type(() => UserSortDto)
  @ValidateNested()
  sorts?: UserSortDto;
}
