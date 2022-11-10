import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceProviders } from './microserviceProviders';
import { RequestToService } from './requestToService';
import { AuthController, ProductsController } from './controllers';
import AuthMiddleware from './common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register(microserviceProviders),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController, ProductsController],
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
      );
  }
}
