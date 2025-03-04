import { PermissionModule } from '@app/permissions';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { AcceptLanguageResolver } from 'nestjs-i18n';
import config from '../../config/config';
import { TokenModule } from '@app/token';
import { RoleModule } from '../role/role.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule as LibUsersModule } from '@app/users';
import { PermissionModule as LibPermissionModule } from '@app/permissions';
import { UsersModule } from '../users/users.module';
import { MessageModule } from '../message/message.module';
import { BannerModule } from '../banner/banner.module';
import { S3Module } from 'nestjs-s3';
import { FaqModule } from '../faq/faq.module';
import { PromotionModule } from '../promotion/promotion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'ru-*': 'ru',
        'en-*': 'en',
      },
      loaderOptions: {
        path: `./libs/i18n/`,
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'), // seconds
      }),
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          credentials: {
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
            accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
          },
          region: configService.get('S3_REGION'),
          endpoint: configService.get('S3_ENDPOINT'),
          forcePathStyle: true,
        },
      }),
    }),
    PermissionModule,
    TokenModule,
    RoleModule,
    PermissionsModule,
    LibUsersModule,
    LibPermissionModule,
    UsersModule,
    MessageModule,
    BannerModule,
    FaqModule,
    PromotionModule,
  ],
})
export class AppModule {}
