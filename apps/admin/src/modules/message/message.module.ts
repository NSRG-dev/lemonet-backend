import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageModule as LibMessageModule } from '@app/message';

@Module({
  imports: [LibMessageModule],
  controllers: [MessageController],
})
export class MessageModule {}
