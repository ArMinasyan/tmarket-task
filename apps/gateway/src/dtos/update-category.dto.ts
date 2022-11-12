import validationMessages from '../common/helpers/validation.messages';
import { IsEmptyString } from '../common/customValidators';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsEmptyString({ message: validationMessages.email })
  name: string;
}
