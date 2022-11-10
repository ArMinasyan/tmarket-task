import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestToService } from '../requestToService';
import { SignInDto } from '../dtos/sign-in.dto';
import messagePatterns from '../message-patterns';
import { SignUpDto } from '../dtos/sign-up.dto';
import { VerifyEmailDto } from '../dtos/verify-email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
  ) {}

  @ApiResponse({ status: 201 })
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto, @Res() res) {
    try {
      const data = await this.requestToService.authRequest(
        messagePatterns.AUTH.SIGN_IN,
        payload,
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiResponse({ status: 201 })
  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto, @Res() res) {
    try {
      const data = await this.requestToService.authRequest(
        messagePatterns.AUTH.SIGN_UP,
        payload,
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiResponse({ status: 200 })
  @Post('verify')
  async verifyEmail(@Body() payload: VerifyEmailDto, @Res() res) {
    try {
      const data = await this.requestToService.authRequest(
        messagePatterns.AUTH.VERIFY_EMAIL,
        payload,
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }
}
