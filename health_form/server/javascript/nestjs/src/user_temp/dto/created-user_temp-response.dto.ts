import { ApiProperty } from "@nestjs/swagger";

export default class CreatedUserTempDto {
    @ApiProperty()
    success:boolean
}