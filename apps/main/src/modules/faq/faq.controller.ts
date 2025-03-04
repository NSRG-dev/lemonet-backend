import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FaqService } from '@app/faq';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.faqService.findAll();
  }
}
