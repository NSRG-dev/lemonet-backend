import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageModule as LibMessageModule } from '@app/message';
import { TokenModule } from '@app/token';
import { MessageController } from './message.controller';

@Module({
  imports: [LibMessageModule, TokenModule],
  providers: [MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}
