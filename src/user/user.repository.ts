import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserRepository {

  constructor(private prisma: PrismaService) { }

  createUser(signUpDto: SignUpDto) {
    return this.prisma.user.create({
      data: signUpDto
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
