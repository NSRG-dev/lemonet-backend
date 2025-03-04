import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqModule as LibFaqModule } from '@app/faq';

@Module({
  controllers: [FaqController],
  imports: [LibFaqModule],
})
export class FaqModule {}
