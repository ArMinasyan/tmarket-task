import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, '../env/.env.dev'),
        path.resolve(__dirname, '../env/.env.prod'),
      ],
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('GOOGLE_USER'),
            clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            accessToken: configService.get<string>('GOOGLE_ACCESS_TOKEN'),
            refreshToken: configService.get<string>('GOOGLE_REFRESH_TOKEN'),
          },
        },
        template: {
          adapter: new HandlebarsAdapter(null, { inlineCssEnabled: true }),
          dir: join(__dirname, 'templates'),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
