import { HttpStatus, Injectable } from '@nestjs/common';
import { v5 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private folderName;

  constructor() {
    const resolvedPath = path.resolve(
      __dirname,
      '../',
      process.env.FOLDER_NAME,
    );

    if (!fs.existsSync(resolvedPath)) {
      fs.mkdirSync(resolvedPath);
    }
    this.folderName = resolvedPath;
  }

  async responseMessage({
    statusCode = HttpStatus.OK,
    success = true,
    data = {},
    message = '',
    validationError = {},
  }) {
    return {
      statusCode: statusCode,
      success: success,
      data: data,
      message: message,
      validationError: validationError,
    };
  }

  async delete(key) {
    await fs.unlinkSync(path.resolve(this.folderName, key));
  }

  async upload({ buffer }) {
    const randomString = Date.now().toString();
    const uuidNameSpace = 'f8e0c645-61ff-4287-a5eb-bf21dcfbc295';
    const key = `${uuid(randomString, uuidNameSpace)}-${Date.now().toString(
      16,
    )}`;

    const location = path.resolve(this.folderName, key);
    const stream = fs.createWriteStream(location, {
      flags: 'wx',
      autoClose: true,
    });
    stream.write(Buffer.from(buffer));

    return this.responseMessage({
      data: {
        location: `${process.env.FOLDER_NAME}/${key}`,
        key: key,
      },
    });
  }

  // async update({ buffer, contentType, key, folder = null }) {
  //   const s3 = this.init(folder);
  //   const updateImage = await s3
  //     .putObject({
  //       Bucket: this.configService.get<string>('aws.bucket_name'),
  //       Body: Buffer.from(buffer),
  //       Key: key,
  //       ContentType: contentType,
  //       ACL: 'public-read',
  //     })
  //     .promise();
  //
  //   return {
  //     result: updateImage.ETag,
  //   };
  // }
}
