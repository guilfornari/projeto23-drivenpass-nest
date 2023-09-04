import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    credential_password: string;

}

