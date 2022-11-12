import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, '../env/.env.dev'),
        path.resolve(__dirname, '../env/.env.prod'),
      ],
      isGlobal: true,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
