import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTempService } from './user_temp.service';
import { CreateUserTempDto } from './dto/create-user_temp.dto';
import { ApiInternalServerErrorResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import CreatedUserTempDto from './dto/created-user_temp-response.dto';
import ErrorResponse from './dto/error-response.dto';

@ApiTags("user_temp")
@Controller('/api/v1/user_temp')
export class UserTempController {
  constructor(private readonly userTempService: UserTempService) {}

  @ApiCreatedResponse({type: CreatedUserTempDto, description:"Success"})
  @ApiInternalServerErrorResponse({type: ErrorResponse, description:"Error"})
  @Post()
  create(@Body() createUserTempDto: CreateUserTempDto): {success: true} {
    const { name, temperature, symptomatic, in_contact } = createUserTempDto

    this.userTempService.LogUserTemp(name, temperature, symptomatic, in_contact);

    console.log("LogUserTemp returned successfully");

    return  {success: true}
  }
}
