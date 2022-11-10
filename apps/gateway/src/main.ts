import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../env', `.env.${process.env.NODE_ENV}`),
});

import { NestFactory } from '@nestjs/core';
import * as formData from 'express-form-data';
import { GatewayModule } from './gateway.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptionFilters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(formData.parse({ autoClean: true }));
  app.use(formData.format());
  app.use(formData.stream());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        throw new HttpException(
          {
            data: {},
            validationError: {
              property: errors[0].property,
              message: Object.values(errors[0].constraints)[0],
            },
            success: false,
            message: '',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TMarket')
    .setDescription('TMarket task')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(8080);
}
bootstrap();
