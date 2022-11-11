import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RequestToService } from '../requestToService';
import messagePatterns from '../message-patterns';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
    private readonly productRepository: ProductRepository,
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
      data: await this.productRepository.find(),
    });
  }

  async getById(id: number) {
    return this.responseMessage({
      data: (await this.productRepository.findOneBy({ id })) || {},
    });
  }

  async createProduct(payload) {
    const uploadFile = await this.requestToService.fileRequest(
      messagePatterns.UPLOAD_FILE,
      {
        buffer: payload.file.buffer,
        contentType: payload.file.contentType,
      },
    );

    const product = await this.productRepository.createProduct({
      name: payload.name,
      category: payload.categoryId,
      price: payload.price,
      seller: payload.sellerId,
      image: uploadFile.data.location,
      key: uploadFile.data.key,
    });

    return this.responseMessage({
      statusCode: HttpStatus.CREATED,
      message: 'Product is created',
      data: product,
    });
  }

  async updateProduct(productId: number, payload: any) {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product?.id) {
      return this.responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        success: false,
        message: 'Product not found',
      });
    }

    await this.productRepository.update(
      { id: productId },
      {
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.categoryId ? { category: payload.categoryId } : {}),
        ...(payload.price ? { price: payload.price } : {}),
      },
    );

    return this.responseMessage({
      message: 'Product is updated',
    });
  }

  async deleteProduct(productId: number) {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product?.id) {
      return this.responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        success: false,
        message: 'Product not found',
      });
    }

    this.requestToService
      .fileRequest(messagePatterns.DELETE_FILE, {
        key: product.key,
      })
      .then();

    await this.productRepository.softDelete({ id: productId });

    return this.responseMessage({
      message: 'Product is deleted',
    });
  }
}
