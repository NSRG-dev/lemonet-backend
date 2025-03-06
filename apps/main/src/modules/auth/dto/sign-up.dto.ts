import { UserCreateDto } from '@app/users/dto/user-create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends UserCreateDto {}
