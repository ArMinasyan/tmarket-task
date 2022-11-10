export interface IResponse {
  statusCode: number;
  success: boolean;
  data: { [key: string]: any } | [{ [key: string]: any }];
  message: string;
  validationError: any;
}
