import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

const PORT = 8081;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
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
