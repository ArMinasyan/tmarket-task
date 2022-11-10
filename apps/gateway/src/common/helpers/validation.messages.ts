export default {
  required: (body: any = '$property') => {
    const property = body['property'];
    const parts = property.split(/(?=[A-Z])/);
    parts[0] = `${parts[0].slice(0, 1).toUpperCase()}${parts[0].slice(1)}`;
    let str = `${parts[0]}`;
    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i++) {
        str += ` ${parts[i].slice(0, 1).toLowerCase()}${parts[i].slice(1)}`;
      }
    }

    return `${str} is required.`.trim();
  },
  remote: 'Please fix this field.',
  mobile: 'Please enter a valid mobile number',
  email: 'Please enter a valid email address.',
  url: 'Please enter a valid URL.',
  uuid: 'Please enter a valid UUID.',
  date: 'Please enter a valid date.',
  dateISO: 'Please enter a valid date (ISO).',
  number: 'Please enter a valid number.',
  digits: 'Please enter only digits.',
  creditCard: 'Please enter a valid credit card number.',
  equalTo: 'Please enter the same value again.',
  accept: 'Please enter a value with a valid extension.',
  maxlength: 'Please enter no more than $constraint1 characters.',
  minlength: 'Please enter at least $constraint1 characters.',
  rangeLength:
    'Please enter a value between $constraint1 and $constraint2 characters long.',
  range: 'Please enter a value between $constraint1 and $constraint2.',
  max: `Please enter a value less than or equal to $constraint1.`,
  min: `Please enter a value greater than or equal to $constraint1.`,
  boolean: `Please enter a valid boolean value`,
};
