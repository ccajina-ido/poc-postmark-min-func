import { Controller, Post, Body } from '@nestjs/common';
import { PostmarkService } from './postmark.service';

@Controller('email')
export class AppController {
  constructor(private readonly postmarkService: PostmarkService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; textBody: string }) {
    const { to, subject, textBody } = body;
    return this.postmarkService.sendEmail(to, subject, textBody);
  }
}