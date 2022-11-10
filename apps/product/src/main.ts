import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../env', `.env.${process.env.NODE_ENV}`),
});

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';

const PORT = 8084;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.TCP,
    options: {
      port: PORT,
      retryAttempts: 3,
      retryDelay: 3000,
    },
  });
  await app.listen();
}

bootstrap();
