import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async findOneUser(id: number) {
    return await this.userRepository.findOneUser(id);
  }
}
