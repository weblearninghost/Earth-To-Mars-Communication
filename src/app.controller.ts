import { Controller, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/earth-mars-comm/:message')
  postMessage(@Param('message') message, @Req() req) {
    const sender = req.headers?.sender;
    const receiver = req.headers?.receiver;
    console.log(`Sender:${sender}
    Receiver:${receiver}
    `);
    return this.appService.messageService(message, sender);
  }
}
