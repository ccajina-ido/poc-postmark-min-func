import { Module } from '@nestjs/common';
import { PostmarkService } from './postmark.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [PostmarkService],
})
export class AppModule {}