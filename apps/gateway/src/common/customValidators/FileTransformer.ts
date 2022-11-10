import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileTransformer implements PipeTransform {
  transform(value) {
    if (!['image/png', 'image/jpeg'].includes(value.mimetype)) {
      throw new HttpException(
        {
          data: {},
          validationError: {
            property: 'image',
            message: 'File can be only png or jpg',
          },
          success: false,
          message: '',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        400,
      );
    }

    if (value.size > 50000) {
      throw new HttpException(
        {
          data: {},
          validationError: {
            property: 'image',
            message: 'Filesize must 50kb or below',
          },
          success: false,
          message: '',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        400,
      );
    }

    return {
      buffer: value.buffer,
    };
  }
}
