import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleAuth } from './role-auth.decorator';

export const SetRole = (role: string | string[]) => {
  return applyDecorators(UseGuards(RoleAuth), SetMetadata('role', role));
};
