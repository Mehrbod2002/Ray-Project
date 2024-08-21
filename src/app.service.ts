import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index(): string {
    return 'this is a index page';
  }
}
