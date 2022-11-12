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
        entities: [ProductEntity, CategoryEntity],
      }),
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
