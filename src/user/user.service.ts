import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  async createUser(email: string, incryptedPassword: string) {
    return await this.userRepository.createUser(email, incryptedPassword);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
