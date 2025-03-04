import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.faq.findMany();
  }
}
