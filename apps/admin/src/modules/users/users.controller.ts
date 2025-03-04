import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@app/users';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  HasPermissions,
  JwtAuthGuard,
  PermissionEnum,
  PermissionGuard,
} from '@app/common';
import { UserSearchDto } from '@app/users/dto/user.search.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UsersController {
  constructor(private readonly libService: UsersService) {}

  @Delete(':id')
  @HasPermissions(PermissionEnum.UserDelete)
  async delete(@Param('id') id: string) {
    return this.libService.delete(id);
  }

  @Post('search')
  @HasPermissions(PermissionEnum.UserSearch)
  async search(@Body() dto: UserSearchDto) {
    return this.libService.search(dto);
  }
}
