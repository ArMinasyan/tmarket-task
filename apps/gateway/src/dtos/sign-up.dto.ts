import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmptyString,
  IsPasswordMatch,
} from '../../../common/customValidators';
import validationMessages from '../../../common/helpers/validation.messages';

export class SignUpDto {
  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: validationMessages.min })
  @IsEmptyString({ message: validationMessages.required })
  password: string;

  @ApiProperty()
  @IsPasswordMatch({ message: validationMessages.equalTo })
  confirmPassword: string;
}
