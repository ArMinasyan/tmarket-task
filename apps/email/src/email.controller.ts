import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import messagePatterns from "../../message-patterns";


@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(messagePatterns.AUTH.SEND_CONFIRM_EMAIL)
  async sendConfirmEmail(@Payload() payload){
    return this.emailService.sendRegistrationMessage(payload.email, { code: payload.code })
  }
}
