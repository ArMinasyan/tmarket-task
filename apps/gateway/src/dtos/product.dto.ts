import { IsNumber } from 'class-validator';
import validationMessages from '../common/helpers/validation.messages';
import { IsEmptyString } from '../common/customValidators';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsEmptyString({ message: validationMessages.email })
  name: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.email })
  categoryId: number;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.email })
  price: number;

  @ApiProperty({
    type: 'file',
    name: 'image',
  })
  image: any;
}
