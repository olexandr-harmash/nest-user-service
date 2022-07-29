import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import {HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class FilesService {
  async createFile(file: any) : Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch(err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
