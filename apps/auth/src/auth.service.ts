import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './repositories/user.repository';
import { EmailConfirmRepository } from './repositories/email-confirm.repository';
import { RequestToService } from './requestToService';
import messagePatterns from '../../gateway/src/message-patterns';

const rnd = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly emailConfirmRepository: EmailConfirmRepository,
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
  ) {}

  async responseMessage({
    statusCode = HttpStatus.OK,
    success = true,
    data = {},
    message = '',
    validationError = {},
  }) {
    return {
      statusCode: statusCode,
      success: success,
      data: data,
      message: message,
      validationError: validationError,
    };
  }

  async signIn({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    const isEmailVerified = await this.emailConfirmRepository.findOneBy({
      email,
    });

    if (!isEmailVerified.isVerified) {
      return this.responseMessage({
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Confirm your email address',
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.responseMessage({
        data: {
          token: this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
          }),
        },
      });
    } else {
      return this.responseMessage({
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Email and/or password incorrect. ',
      });
    }
  }

  async signUp({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (user?.id) {
      return this.responseMessage({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already registered',
      });
    }

    const passwordHash = bcrypt.hashSync(password, 12);
    await this.userRepository.save({
      email,
      password: passwordHash,
    });

    const status = await this.setStatus({ email });

    this.requestToService
      .emailRequest(messagePatterns.AUTH.SEND_CONFIRM_EMAIL, {
        email,
        code: status.code,
      })
      .then();
    return this.responseMessage({
      statusCode: HttpStatus.CREATED,
      message: 'Registration success, confirm your email',
    });
  }

  async verifyEmail({ email, code }) {
    const verify = await this.emailConfirmRepository.confirm(email, code);

    if (verify?.affected) {
      return this.responseMessage({
        message: 'Email is confirmed',
      });
    } else {
      return this.responseMessage({
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Incorrect verification code',
      });
    }
  }

  async isEmailVerified({ email }) {
    const verify = await this.emailConfirmRepository.findOneBy({ email });

    return this.responseMessage({
      data: {
        isVerified: verify?.isVerified || false,
      },
    });
  }

  async setStatus({ email }) {
    const code = rnd(11111, 99999);
    await this.emailConfirmRepository.save({
      email,
      code,
    });
    return {
      code,
    };
  }
}
