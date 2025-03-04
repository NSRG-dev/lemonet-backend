import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerCreateDto } from '@app/banner/dto/banner.create.dto';
import {
  HasPermissions,
  JwtAuthGuard,
  PermissionEnum,
  PermissionGuard,
} from '@app/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('banners')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class BannerController {
  constructor(private readonly service: BannerService) {}

  @Post()
  @HasPermissions(PermissionEnum.BannerCreate)
  create(@Body() data: BannerCreateDto) {
    return this.service.create(data);
  }
}
