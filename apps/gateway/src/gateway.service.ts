import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { RequestToService } from './requestToService';
import messagePatterns from './message-patterns';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
  ) {}
  signIn(payload: SignInDto) {
    return this.requestToService.authRequest(
      messagePatterns.AUTH.SIGN_IN,
      payload,
    );
  }

  signUp(payload: SignUpDto) {
    return this.requestToService.authRequest(
      messagePatterns.AUTH.SIGN_UP,
      payload,
    );
  }
}
