import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { FaqBaseDto } from '@app/faq/dto/faq.base.dto';
import { FaqService as LibFaqService } from '@app/faq';

@Injectable()
export class FaqService {
  constructor(
    private readonly faqRepository: FaqRepository,
    private readonly libFaqService: LibFaqService,
  ) {}

  async create(data: FaqBaseDto) {
    return this.faqRepository.create(data);
  }

  async delete(id: string) {
    await this.libFaqService.ensureExistsById(id);
    return this.faqRepository.delete(id);
  }
}
