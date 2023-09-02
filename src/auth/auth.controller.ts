import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDtoDto: SignUpDto) {
    return this.authService.signUp(signUpDtoDto);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signUpDtoDto: SignUpDto) {
    return this.authService.signIn(signUpDtoDto);
  }

}
