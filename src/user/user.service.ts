import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findOneUser(id: number) {
    return this.userRepository.findOneUser(id);
  }
}
