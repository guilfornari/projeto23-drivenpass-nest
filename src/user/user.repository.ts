import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {

  constructor(private prisma: PrismaService) { }

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
