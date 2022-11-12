import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceProviders } from './microserviceProviders';
import { RequestToService } from './requestToService';
import {
  AuthController,
  ProductsController,
  CategoriesController,
} from './controllers';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
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
    ClientsModule.register(microserviceProviders),
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
  ],
  controllers: [AuthController, ProductsController, CategoriesController],
  providers: [
    GatewayService,
    {
      provide: 'REQUEST_TO_SERVICE',
      useClass: RequestToService,
    },
  ],
})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/products', method: RequestMethod.POST },
        { path: '/products', method: RequestMethod.PUT },
        { path: '/products', method: RequestMethod.DELETE },
        { path: '/categories', method: RequestMethod.POST },
        { path: '/categories', method: RequestMethod.PUT },
      );
  }
}
