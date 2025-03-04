import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@app/common';
import { MessageService } from '@app/message';
import { I18nService } from 'nestjs-i18n';

type RequestWithUser = Request & { user: User };

@Injectable()
export class CanDeleteMessageGuard implements CanActivate {
  constructor(
    private readonly messageService: MessageService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const user = request.user;

    const params = request.params;

    const message = await this.messageService.findOneById(params.id);

    if (message.senderId !== user.id) {
      throw new ForbiddenException(this.i18n.t('errors.forbidden'));
    }

    return true;
  }
}
