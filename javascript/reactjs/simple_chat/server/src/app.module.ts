import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MessagesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
