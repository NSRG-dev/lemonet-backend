import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { PrismaModule } from '@app/prisma/prisma.module';
import { FaqModule as LibFaqModule } from '@app/faq';

@Module({
  imports: [PrismaModule, LibFaqModule],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
})
export class FaqModule {}
