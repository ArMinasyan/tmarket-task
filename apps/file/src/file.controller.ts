import { Controller } from '@nestjs/common';
import { FileService } from './file.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import messagePatterns from './message-patterns';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern(messagePatterns.UPLOAD_FILE)
  uploadFile(@Payload() payload) {
    return this.fileService.upload(payload);
  }

  @MessagePattern(messagePatterns.DELETE_FILE)
  deleteFile(@Payload() payload) {
    return this.fileService.delete(payload.key);
  }
}
