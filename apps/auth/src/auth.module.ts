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

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_DB,
      synchronize: true,
      entities: [UserEntity, ConfirmEmailEntity],
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
