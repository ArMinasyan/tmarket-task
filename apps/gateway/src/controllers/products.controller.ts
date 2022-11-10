import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestToService } from '../requestToService';
import messagePatterns from '../message-patterns';
import { ProductDto } from '../dtos/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTransformer } from '../common/customValidators/FileTransformer';
import { User } from '../common/customDecorators/user.decorator';
import { ProductParamDto } from '../dtos/product-param.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { SetRole } from "../common/customDecorators/set-role.decorator";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
  ) {}

  @ApiResponse({ status: 200 })
  @Get()
  async getProduct(@Res() res) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.PRODUCT.GET_ALL,
        {},
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiResponse({ status: 200 })
  @Get(':productId')
  async getProductById(@Param() param: ProductParamDto, @Res() res) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.PRODUCT.GET_BY_ID,
        { id: param.productId },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
  @UseInterceptors(FileInterceptor('image'))
  @SetRole('seller')
  @Post()
  async createProduct(
    @User() user,
    @Body() payload: ProductDto,
    @UploadedFile(FileTransformer) file,
    @Res() res,
  ) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.PRODUCT.CREATE,
        { ...payload, sellerId: user.id, file },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Put(':productId')
   @SetRole('seller')
  async updateProduct(
    @User() user,
    @Body() payload: UpdateProductDto,
    @Param() param: ProductParamDto,
    @Res() res,
  ) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.PRODUCT.UPDATE,
        { id: param.productId, data: payload },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Delete(':productId')
  //@SetRole('seller')
  async deleteProduct(
    @User() user,
    @Param() param: ProductParamDto,
    @Res() res,
  ) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.PRODUCT.DELETE,
        { id: param.productId },
      );

      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }
}
