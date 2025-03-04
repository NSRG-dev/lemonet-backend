import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BannerBaseDto } from './banner.base.dto';
import { IsNotEmpty } from 'class-validator';

export class BannerCreateDto extends BannerBaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mediaId: string;
}
