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
  constructor(@Inject('FILE_SERVICE') private fileClient: ClientProxy) {}

  async fileRequest(pattern, info): Promise<resType> {
    return new Promise((res, rej) => {
      this.fileClient.send(pattern, info).subscribe({
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
