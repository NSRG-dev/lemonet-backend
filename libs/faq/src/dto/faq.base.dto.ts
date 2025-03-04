import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FaqBaseDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;
}
