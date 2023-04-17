import { Module } from '@nestjs/common';
import { UserTempService } from './user_temp.service';
import { UserTempController } from './user_temp.controller';
import UserTempRepository from './user-temp-repository';

@Module({
  controllers: [UserTempController],
  providers: [UserTempService, UserTempRepository]
})
export class UserTempModule {}
