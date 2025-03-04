import { UsersService } from '@app/users';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { MessageService } from '@app/message';
import { Logger, UseFilters, UsePipes } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageCreateDto } from '@app/message/dto/message.create.dto';
import { TokenService } from '@app/token';
import { WsExceptionFilter } from '@app/common/filters/ws-exception.filter';
import { WsValidationPipe } from '@app/common/pipes/ws-validation.pipe';

@WebSocketGateway({
  transports: ['websocket'],
})
@UseFilters(WsExceptionFilter)
@UsePipes(new WsValidationPipe())
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(MessageGateway.name);

  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async handleConnection(client: Socket) {
    const authHeader = client.handshake.headers.authorization;
    this.logger.debug(`Client connected: ${client.id}`);

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = await this.tokenService.verifyAccessToken(token);
        const user = await this.usersService.findOneById(decoded.id);
        client.data.user = user;
        client.data.authenticated = true;
      } catch (error) {
        this.logger.warn(`Invalid token from client: ${client.id}`);
        client.data.authenticated = false;
      }
    } else {
      client.data.authenticated = false;
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessageCreateDto,
  ) {
    if (!client.data.authenticated) {
      throw new WsException('Unauthorized to send messages');
    }
    const message = await this.messageService.create(
      payload,
      client.data.user.id,
    );
    this.server.emit('newMessage', message);
  }

  async emitMessageDeleted(messageId: string) {
    this.server.emit('messageDeleted', messageId);
  }
}
