import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer'
import { join } from "path";
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {

  }

  async sendRegistrationMessage(to: string, context: {}) {
    await this.mailerService.sendMail({
      from: '',
      to: to,
      subject: "Confirm email address",
      template: join(__dirname, "templates", "registration"),
      context,
    });
  }
}
