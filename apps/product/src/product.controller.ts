import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import messagePatterns from './message-patterns';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(messagePatterns.GET_ALL)
  getAll(@Payload() payload) {}

  @MessagePattern(messagePatterns.GET_BY_ID)
  getById(@Payload() payload) {}

  @MessagePattern(messagePatterns.CREATE)
  createProduct(@Payload() payload) {}

  @MessagePattern(messagePatterns.UPDATE)
  updateProduct(@Payload() payload) {}

  @MessagePattern(messagePatterns.DELETE)
  deleteProduct(@Payload() payload) {}
}
