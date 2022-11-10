import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const microserviceProviders: ClientsModuleOptions = [
  {
    name: 'FILE_SERVICE',
    transport: Transport.TCP,
    options: {
      port: 8083,
    },
  },
];
