import { ApiProperty } from "@nestjs/swagger";

export default class ErrorResponse {
    @ApiProperty()
    error_code:number

    @ApiProperty()
    error_message: string
}