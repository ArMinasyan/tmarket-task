import { HttpStatus } from '@nestjs/common';

export default ({
  statusCode = HttpStatus.OK,
  success = true,
  data = {},
  message = '',
  validationError = {},
}) => {
  return {
    statusCode: statusCode,
    success: success,
    data: data || {},
    message: message,
    validationError: validationError,
  };
};
