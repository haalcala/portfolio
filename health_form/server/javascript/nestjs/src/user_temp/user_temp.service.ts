import { Injectable } from '@nestjs/common';
import { CreateUserTempDto } from './dto/create-user_temp.dto';

@Injectable()
export class UserTempService {
  create(createUserTempDto: CreateUserTempDto) {
    return 'This action adds a new userTemp';
  }
}
