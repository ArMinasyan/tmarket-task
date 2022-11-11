import { IsNumber } from 'class-validator';
import validationMessages from '../common/helpers/validation.messages';
import { IsEmptyString } from '../common/customValidators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class ProductDto {
  @ApiProperty()
  @IsEmptyString({ message: validationMessages.email })
  name: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.number })
  @Type(() => Number)
  categoryId: number;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.number })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    type: 'file',
    name: 'image',
  })
  @Optional()
  image?: any;
}
