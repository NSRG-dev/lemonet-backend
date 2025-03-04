import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FaqService {
  constructor(
    private readonly faqRepository: FaqRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll() {
    return this.faqRepository.findAll();
  }

  async ensureExistsById(id: string) {
    const exists = await this.faqRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.faq.notFound'));
    }
  }
}
