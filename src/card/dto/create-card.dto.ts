import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreateCardDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    number: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    safeCode: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    expDate: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    virtual: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string

}
