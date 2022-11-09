import { IsEmail } from 'class-validator';
import { IsEmptyString } from '../../../common/customValidators';
import validationMessages from '../../../common/helpers/validation.messages';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsEmptyString({ message: validationMessages.required })
  code: number;
}
