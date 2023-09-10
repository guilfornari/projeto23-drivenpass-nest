import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BcryptService } from '../crypto/bcrypt.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptService) { }

  async createUser(signUpDto: SignUpDto) {
    const user = await this.userRepository.getUserByEmail(signUpDto.email);
    if (user) throw new ConflictException("This e-mail is already in use");
    return await this.userRepository.createUser({
      ...signUpDto,
      password: this.bcrypt.hash(signUpDto.password)
    });
  }

  async isMatchforPassword(user: User, password: string) {
    return this.bcrypt.compare(password, user.password)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }

}
