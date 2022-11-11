import { IsNumber, IsOptional } from "class-validator";
import validationMessages from '../common/helpers/validation.messages';
import { IsEmptyString } from '../common/customValidators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CategoryDto {
  @ApiProperty()
  @IsEmptyString({ message: validationMessages.email })
  name: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.number })
  @IsOptional()
  parent: number | null;
}
