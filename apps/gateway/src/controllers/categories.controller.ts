import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestToService } from '../requestToService';
import messagePatterns from '../message-patterns';
import { ProductDto } from '../dtos/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTransformer } from '../common/customValidators/FileTransformer';
import { User } from '../common/customDecorators/user.decorator';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { SetRole } from '../common/customDecorators/set-role.decorator';
import { CategoryParamDto } from '../dtos/category-param.dto';
import { CategoryDto } from '../dtos/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('REQUEST_TO_SERVICE')
    private readonly requestToService: RequestToService,
  ) {}

  @ApiResponse({ status: 200 })
  @Get()
  async getCategory(@Res() res) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.CATEGORY.GET_ALL,
        {},
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiResponse({ status: 200 })
  @Get(':categoryId')
  async getCategoryById(@Param() param: CategoryParamDto, @Res() res) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.CATEGORY.GET_BY_ID,
        { id: param.categoryId },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
 @SetRole('seller')
  @Post()
  async createCategory(@User() user, @Body() payload: CategoryDto, @Res() res) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.CATEGORY.CREATE,
        { ...payload },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Put(':categoryId')
  @SetRole('seller')
  async updateCategory(
    @User() user,
    @Body() payload: CategoryDto,
    @Param() param: CategoryParamDto,
    @Res() res,
  ) {
    try {
      const data = await this.requestToService.productRequest(
        messagePatterns.CATEGORY.UPDATE,
        { id: param.categoryId, data: payload },
      );
      res.status(data.statusCode).json(data);
    } catch (e) {
      res.status(e.statusCode).json(e);
    }
  }
}
