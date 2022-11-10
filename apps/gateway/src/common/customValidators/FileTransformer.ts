import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileTransformer implements PipeTransform {
  transform(value) {
    const newFiles = {};
    if (value && Object.keys(value).length > 0) {
      const getValues = Object.values(value);
      if (Array.isArray(getValues[0])) {
        Object.keys(value).map((key) => {
          newFiles[key] = {
            buffer: value[key][0].buffer,
            contentType: value[key][0].mimetype,
          };
        });
      } else {
        newFiles['buffer'] = value.buffer;
        newFiles['contentType'] = value.mimetype;
      }

      return newFiles;
    }

    return newFiles;
  }
}
