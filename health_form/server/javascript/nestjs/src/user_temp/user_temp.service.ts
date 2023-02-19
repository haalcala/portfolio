import { Injectable } from '@nestjs/common';
import { CreateUserTempDto } from './dto/create-user_temp.dto';
import UserTempRepository from './user-temp-repository';

@Injectable()
export class UserTempService {
  constructor(private readonly repository: UserTempRepository) {
  }

  LogUserTemp(name, temperature, symptomatic, in_contact) {

    if (!name) {
      throw new Error("Required missing parameter 'name'")
    }
    if (name.length >= 100) {
      throw new Error("Parameter 'name' too long")
    }
    if (!temperature) {
      throw new Error("Required missing parameter 'temperature'")
    }
    if (temperature < 30 || temperature > 100) {
      throw new Error("Invalid temperature")
    }

    this.repository.LogToDB(name, temperature, symptomatic, in_contact)
  }
}
