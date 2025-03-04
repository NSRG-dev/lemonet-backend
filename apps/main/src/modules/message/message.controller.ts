import { RemovePasswordInterceptor } from '@app/common/interceptors/password.interceptor';
import { MessageService } from '@app/message';
import { MessageSearchDto } from '@app/message/dto/message.search.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CanDeleteMessageGuard } from './guards/can-delete.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';
import { MessageGateway } from './message.gateway';

@Controller('messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(RemovePasswordInterceptor)
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway,
  ) {}

  @Post('search')
  async search(@Body() searchDto: MessageSearchDto) {
    return this.messageService.search(searchDto);
  }

  @Delete(':id')
  @UseGuards(CanDeleteMessageGuard)
  async delete(@Param('id') id: string) {
    await this.messageService.delete(id);
    await this.messageGateway.emitMessageDeleted(id);
    return { message: 'Message deleted successfully' };
  }
}
