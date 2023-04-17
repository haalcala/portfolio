import { Test, TestingModule } from '@nestjs/testing';
import UserTempRepository from '../../src/user_temp/user-temp-repository';
import { UserTempController } from '../../src/user_temp/user_temp.controller';
import { UserTempService } from '../../src/user_temp/user_temp.service';

describe('UserTempController', () => {
  let controller: UserTempController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTempController],
      providers: [UserTempService, UserTempRepository],
    }).compile();

    controller = module.get<UserTempController>(UserTempController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
