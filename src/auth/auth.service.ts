import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpDto } from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async signUp(signUpDto: SignUpDto) {
    return await this.userService.createUser(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException(`Email or password not valid.`);

    const isMatch = await this.userService.isMatchforPassword(user, password)
    if (!isMatch) throw new UnauthorizedException(`Email or password not valid.`);

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const { id, email } = user;

    const token = this.jwtService.sign({ email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { token }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

}