import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FaqService } from '@app/faq';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CacheTTLEnum } from '@app/common/constants/cache-ttl.enum';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(CacheTTLEnum.FAQ)
  async findAll() {
    return this.faqService.findAll();
  }
}
