import { FaqBaseDto } from '@app/faq/dto/faq.base.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: FaqBaseDto) {
    return this.prisma.faq.create({
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.faq.delete({
      where: {
        id,
      },
    });
  }
}
