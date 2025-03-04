import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserBaseDto {
  @ApiProperty({ default: 'string@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'string' })
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
