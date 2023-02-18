import { Module } from '@nestjs/common';
import { UserTempService } from './user_temp.service';
import { UserTempController } from './user_temp.controller';

@Module({
  controllers: [UserTempController],
  providers: [UserTempService]
})
export class UserTempModule {}
