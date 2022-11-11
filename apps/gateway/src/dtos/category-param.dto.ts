import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import validationMessages from '../common/helpers/validation.messages';
import { Type } from 'class-transformer';

export class CategoryParamDto {
  @ApiProperty()
  @IsNumber({}, { message: validationMessages.number })
  @Type(() => Number)
  categoryId: number;
}
