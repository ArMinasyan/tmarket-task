import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const microserviceProviders: ClientsModuleOptions = [
  {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP,
    options: {
      port: 8081,
    },
  },
];
