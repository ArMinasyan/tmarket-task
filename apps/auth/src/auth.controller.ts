import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import messagePatterns from './message-patterns';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(messagePatterns.SIGN_IN)
  signInHandler(@Payload() payload) {
    return this.authService.signIn(payload);
  }

  @MessagePattern(messagePatterns.SIGN_UP)
  signUpHandler(@Payload() payload) {
    return this.authService.signUp(payload);
  }

  @MessagePattern(messagePatterns.VERIFY_EMAIL)
  verifyEmailHandler(@Payload() payload) {
    return this.authService.verifyEmail(payload);
  }
}
