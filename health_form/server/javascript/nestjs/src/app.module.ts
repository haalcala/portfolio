import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTempModule } from './user_temp/user_temp.module';

@Module({
  imports: [UserTempModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
