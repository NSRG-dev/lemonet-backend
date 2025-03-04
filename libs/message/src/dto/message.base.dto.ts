import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MessageBaseDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @IsNotEmpty()
  content: string;
}
