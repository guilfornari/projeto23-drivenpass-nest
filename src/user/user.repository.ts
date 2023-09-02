import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {

  constructor(private prisma: PrismaService) { }

  createUser(email: string, incryptedPassword: string) {
    return this.prisma.user.create({
      data: {
        email,
        password: incryptedPassword
      }
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

}
