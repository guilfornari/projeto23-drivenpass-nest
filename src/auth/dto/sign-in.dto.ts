import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export default class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}