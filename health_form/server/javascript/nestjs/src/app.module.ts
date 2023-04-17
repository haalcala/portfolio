import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTempModule } from './user_temp/user_temp.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserTempModule,
    ServeStaticModule.forRoot({
      rootPath: "public",
    }),],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
