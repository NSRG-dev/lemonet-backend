import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageCreateDto } from './dto/message.create.dto';
import { MessageSearchDto } from './dto/message.search.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly i18n: I18nService,
  ) {}

  async create(message: MessageCreateDto, senderId: string) {
    return this.messageRepository.create(message, senderId);
  }

  async search(searchDto: MessageSearchDto) {
    return this.messageRepository.search(searchDto);
  }

  async findOneById(id: string) {
    const messsage = await this.messageRepository.findOneById(id);
    if (!messsage) {
      throw new NotFoundException(this.i18n.t('errors.message.notFound'));
    }

    return messsage;
  }

  async delete(id: string) {
    await this.ensureExistsById(id);
    return this.messageRepository.delete(id);
  }

  async ensureExistsById(id: string) {
    const exists = await this.messageRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.message.notFound'));
    }
  }
}
