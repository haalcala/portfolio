import { ApiProperty } from "@nestjs/swagger";

export class CreateUserTempDto {
    @ApiProperty()
    name:string
    
    @ApiProperty()
    temperature:number

    @ApiProperty()
    symptomatic:boolean

    @ApiProperty()
    in_contact:boolean

}
