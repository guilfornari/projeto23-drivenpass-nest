import { Injectable } from '@nestjs/common';
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

  async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }

}
