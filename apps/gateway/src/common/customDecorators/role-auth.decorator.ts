import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleAuth implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = this.reflector.get<string>('role', context.getHandler());
    const user = request.user;

    if (role.includes(user['role']) || role === user['role']) {
      request.user = user;
      return true;
    }
    throw new HttpException(
      {
        statusCode: 403,
        success: false,
        data: {},
        message: 'Forbidden',
        validationError: {},
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
