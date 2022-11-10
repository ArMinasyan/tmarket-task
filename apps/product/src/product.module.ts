import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { RequestToService } from './requestToService';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceProviders } from './microserviceProviders';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_DB,
      synchronize: true,
      entities: [ProductEntity],
    }),
    TypeOrmModule.forFeature([ProductEntity]),
    ClientsModule.register(microserviceProviders),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'REQUEST_TO_SERVICE',
      useClass: RequestToService,
    },
  ],
})
export class ProductModule {}
