import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
