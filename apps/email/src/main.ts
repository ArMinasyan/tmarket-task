import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../env', `.env.${process.env.NODE_ENV}`),
});

import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';

import { Transport } from '@nestjs/microservices';

const PORT = 8082;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmailModule, {
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
