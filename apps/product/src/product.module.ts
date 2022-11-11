import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { RequestToService } from './requestToService';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceProviders } from './microserviceProviders';
import { ProductRepository } from './repositories/product.repository';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_DB,
      synchronize: true,
      entities: [ProductEntity, CategoryEntity],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    ClientsModule.register(microserviceProviders),
  ],
  controllers: [ProductController, CategoryController],
  providers: [
    ProductService,
    CategoryService,
    ProductRepository,
    CategoryRepository,
    {
      provide: 'REQUEST_TO_SERVICE',
      useClass: RequestToService,
    },
  ],
})
export class ProductModule {}
