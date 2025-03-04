import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FaqService, FaqRepository],
  exports: [FaqService],
})
export class FaqModule {}
