import { JwtAuthGuard, PermissionEnum } from '@app/common';
import { HasPermissions } from '@app/common';
import { MessageService } from '@app/message';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('message')
@ApiBearerAuth()
@ApiTags('Message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly libService: MessageService) {}

  @Delete(':id')
  @HasPermissions(PermissionEnum.MessageDelete)
  async delete(@Param('id') id: string) {
    return this.libService.delete(id);
  }
}
