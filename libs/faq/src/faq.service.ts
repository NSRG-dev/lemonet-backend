import { Injectable } from '@nestjs/common';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  async findAll() {
    return this.faqRepository.findAll();
  }
}
