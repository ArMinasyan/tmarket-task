import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface resType {
  statusCode: number;
  success: boolean;
  data: any;
  message: string;
  validationError: any;
}

@Injectable()
export class RequestToService {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) {}

  async authRequest(pattern, info): Promise<resType> {
    return new Promise((res, rej) => {
      this.authClient.send(pattern, info).subscribe({
        next: (data) => {
          res(data);
        },
        error: (error) => {
          rej({
            statusCode: 500,
            success: false,
            data: '',
            message: error,
            validationError: {},
          });
        },
      });
    });
  }

  async productRequest(pattern, info): Promise<resType> {
    return new Promise((res, rej) => {
      this.productClient.send(pattern, info).subscribe({
        next: (data) => {
          res(data);
        },
        error: (error) => {
          rej({
            statusCode: 500,
            success: false,
            data: '',
            message: error,
            validationError: {},
          });
        },
      });
    });
  }
}
