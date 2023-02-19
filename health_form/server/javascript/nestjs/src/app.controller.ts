import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("------------- AppController:: this.appService:",this.appService)
    return this.appService.getHello();
  }
}
