import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import messagePatterns from '../message-patterns';
import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern(messagePatterns.CATEGORY.GET_ALL)
  getAll(@Payload() payload) {
    return this.categoryService.getAll();
  }

  @MessagePattern(messagePatterns.CATEGORY.GET_BY_ID)
  getById(@Payload() payload) {
    return this.categoryService.getById(payload.id);
  }

  @MessagePattern(messagePatterns.CATEGORY.CREATE)
  createProduct(@Payload() payload) {
    return this.categoryService.createCategory(payload);
  }

  @MessagePattern(messagePatterns.CATEGORY.UPDATE)
  updateProduct(@Payload() payload) {
    return this.categoryService.updateCategory(payload.id, payload.data);
  }
}
