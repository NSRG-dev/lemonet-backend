import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FaqService {
  private readonly logger = new Logger(FaqService.name);

  constructor(
    private readonly faqRepository: FaqRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll() {
    this.logger.log('Finding all faqs in db');
    return this.faqRepository.findAll();
  }

  async ensureExistsById(id: string) {
    const exists = await this.faqRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.faq.notFound'));
    }
  }
}
