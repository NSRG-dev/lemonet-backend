import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqBaseDto } from '@app/faq/dto/faq.base.dto';
import {
  HasPermissions,
  JwtAuthGuard,
  PermissionEnum,
  PermissionGuard,
} from '@app/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('faqs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @HasPermissions(PermissionEnum.FaqCreate)
  async create(@Body() data: FaqBaseDto) {
    return this.faqService.create(data);
  }

  @Delete(':id')
  @HasPermissions(PermissionEnum.FaqDelete)
  async delete(@Param('id') id: string) {
    return this.faqService.delete(id);
  }
}
