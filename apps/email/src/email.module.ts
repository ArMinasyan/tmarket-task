import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_USER,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            accessToken: process.env.GOOGLE_ACCESS_TOKEN,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
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
