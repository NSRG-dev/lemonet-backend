import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserBaseDto } from './user-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto extends UserBaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  referalCode?: string;
}
