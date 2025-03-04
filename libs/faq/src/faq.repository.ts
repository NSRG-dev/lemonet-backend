import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.faq.findMany();
  }

  async existsById(id: string): Promise<boolean> {
    const result = await this.prisma.$queryRaw`
      SELECT EXISTS(
        SELECT 1 
        FROM "faqs" 
        WHERE id = ${id}
      ) as exists
    `;

    return Boolean(result[0].exists);
  }
}
