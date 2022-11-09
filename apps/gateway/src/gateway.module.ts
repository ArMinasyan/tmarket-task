import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceProviders } from './microserviceProviders';
import { RequestToService } from './requestToService';

@Module({
  imports: [ClientsModule.register(microserviceProviders)],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    {
      provide: 'REQUEST_TO_SERVICE',
      useClass: RequestToService,
    },
  ],
})
export class GatewayModule {}
