import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RequestToService } from '../requestToService';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async responseMessage({
    statusCode = HttpStatus.OK,
    success = true,
    data = {},
    message = '',
    validationError = {},
  }) {
    return {
      statusCode: statusCode,
      success: success,
      data: data,
      message: message,
      validationError: validationError,
    };
  }

  async getAll() {
    return this.responseMessage({
      data: await this.categoryRepository.find(),
    });
  }

  async getById(id: number) {
    return this.responseMessage({
      data: (await this.categoryRepository.findOneBy({ id })) || {},
    });
  }

  async createCategory(payload) {
    const category = await this.categoryRepository.save({
      name: payload.name,
      parent_id: payload.parent,
    });

    return this.responseMessage({
      statusCode: HttpStatus.CREATED,
      message: 'Product is created',
      data: category,
    });
  }

  async updateCategory(categoryId: number, payload: any) {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category?.id) {
      return this.responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        success: false,
        message: 'Category not found',
      });
    }

    await this.categoryRepository.update(
      { id: categoryId },
      {
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.parent ? { parent_id: payload.parent } : {}),
      },
    );

    return this.responseMessage({
      message: 'Category is updated',
    });
  }
}
