import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";


export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    @IsNotEmpty()
    password: string;

}
