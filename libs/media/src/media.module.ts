import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { S3Module } from 'nestjs-s3';
import { MediaRepository } from './media.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule, S3Module],
  providers: [MediaService, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
