import { IsEmail } from 'class-validator';
import validationMessages from '../../../common/helpers/validation.messages';
import { IsEmptyString } from '../../../common/customValidators';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsEmptyString({ message: validationMessages.required })
  password: string;
}
