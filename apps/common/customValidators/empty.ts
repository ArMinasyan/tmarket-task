import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEmptyString(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsEmptyString',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === 0) value = value.toString();
          return (
            (value && value.toString() && value.toString().trim().length) ||
            false
          );
        },
      },
    });
  };
}
