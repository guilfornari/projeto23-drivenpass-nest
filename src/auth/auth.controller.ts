import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags("authorization")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  @ApiOperation({ summary: "Creates a new user" })
  @ApiCreatedResponse({ description: "Created" })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDtoDto: SignUpDto) {
    return this.authService.signUp(signUpDtoDto);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "For an user to log in" })
  @ApiOkResponse({ description: "Logged in" })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

}
