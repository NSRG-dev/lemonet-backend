import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { Message } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { MessageCreateDto } from './dto/message.create.dto';
import { MESSAGE_INCLUDE } from '@app/common/types/include/message.include';
import { MessageSearchDto } from './dto/message.search.dto';
import { mapSort } from '@app/prisma/map.sort';
import { mapPagination, mapSearch } from '@app/prisma';

@Injectable()
export class MessageRepository {
  private readonly MAX_MESSAGES: number;
  private readonly logger = new Logger(MessageRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.MAX_MESSAGES = this.config.get<number>('MAX_MESSAGES');
    this.logger.log(`MAX_MESSAGES: ${this.MAX_MESSAGES}`);
  }

  async findOneById(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
      include: MESSAGE_INCLUDE,
    });
  }

  async delete(id: string) {
    return this.prisma.message.delete({
      where: { id },
      include: MESSAGE_INCLUDE,
    });
  }

  async search(searchDto: MessageSearchDto) {
    return this.prisma.message.findMany({
      where: mapSearch(searchDto.filters),
      orderBy: [{ createdAt: 'asc' }, ...mapSort(searchDto.sort)],
      ...mapPagination(searchDto.pagination),
      include: MESSAGE_INCLUDE,
    });
  }

  async existsById(id: string) {
    const count = await this.prisma.message.count({
      where: { id },
    });
    return count > 0;
  }

  async create(message: MessageCreateDto, senderId: string) {
    await this.deleteOldMessagesIfNeeded();

    return this.createMessage(senderId, message.content);
  }

  private async deleteOldMessagesIfNeeded(): Promise<void> {
    const messages = await this.getUserMessages();

    if (this.shouldDeleteOldMessages(messages.length)) {
      await this.deleteOldMessages(messages);
    }
  }

  private async getUserMessages() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  private shouldDeleteOldMessages(messagesCount: number): boolean {
    return messagesCount >= this.MAX_MESSAGES;
  }

  private async deleteOldMessages(messages: Message[]): Promise<void> {
    const countToDelete = messages.length - this.MAX_MESSAGES + 1;
    const messagesToDelete = messages.slice(0, countToDelete);

    await this.prisma.message.deleteMany({
      where: {
        id: {
          in: messagesToDelete.map((msg) => msg.id),
        },
      },
    });
  }

  private async createMessage(senderId: string, content: string) {
    return this.prisma.message.create({
      data: {
        senderId,
        content,
      },
      include: MESSAGE_INCLUDE,
    });
  }
}
