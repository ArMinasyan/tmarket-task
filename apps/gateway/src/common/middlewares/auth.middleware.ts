import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token =
      (req?.headers?.authorization?.startsWith('Bearer') &&
        req?.headers?.authorization?.split(' ')[1]) ||
      null;

    if (token) {
      try {
        req['user'] = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
        next();
      } catch (err) {
        throw new HttpException(
          {
            statusCode: 401,
            success: false,
            data: {},
            message: 'Unauthorized',
            validationError: {},
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        {
          statusCode: 401,
          success: false,
          data: {},
          message: 'Unauthorized',
          validationError: {},
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
