import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RequestToService } from './requestToService';
import { EmailConfirmRepository } from './repositories/email-confirm.repository';
import { ConfirmEmailEntity } from './entities/confirm-email.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          algorithm: 'HS256',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USERNAME'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DB'),
        type: 'postgres',
        synchronize: configService.get<boolean>('PG_SYNC'),
        logging: configService.get<boolean>('PG_LOGGING'),
        entities: [UserEntity, ConfirmEmailEntity],
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, ConfirmEmailEntity]),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8082,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    EmailConfirmRepository,
    {
      provide: 'REQUEST_TO_SERVICE',
      useClass: RequestToService,
    },
  ],
})
export class AuthModule {}
