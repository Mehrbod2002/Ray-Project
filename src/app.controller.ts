import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("cats")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  findOne(): string {
    return this.appService.index();
  }
}
