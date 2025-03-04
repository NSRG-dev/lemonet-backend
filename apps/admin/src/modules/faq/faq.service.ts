import { Injectable } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { FaqBaseDto } from '@app/faq/dto/faq.base.dto';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  async create(data: FaqBaseDto) {
    return this.faqRepository.create(data);
  }
}
