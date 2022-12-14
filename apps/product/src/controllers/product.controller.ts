import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import messagePatterns from '../message-patterns';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(messagePatterns.GET_ALL)
  getAll(@Payload() payload) {
    return this.productService.getAll();
  }

  @MessagePattern(messagePatterns.GET_BY_ID)
  getById(@Payload() payload) {
    return this.productService.getById(payload.id);
  }

  @MessagePattern(messagePatterns.CREATE)
  createProduct(@Payload() payload) {
    return this.productService.createProduct(payload);
  }

  @MessagePattern(messagePatterns.UPDATE)
  updateProduct(@Payload() payload) {
    return this.productService.updateProduct(payload.id, payload.data);
  }

  @MessagePattern(messagePatterns.DELETE)
  deleteProduct(@Payload() payload) {
    return this.productService.deleteProduct(payload.id);
  }
}
