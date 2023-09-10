import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CredentialRepository {
  constructor(private prisma: PrismaService) { }

  createCredential(user: User, createCredentialDto: CreateCredentialDto) {

    return this.prisma.credential.create({
      data: {
        ...createCredentialDto,
        user: {
          connect: user
        }
      }
    });
  }

  findAllCredentials(user: User) {
    return this.prisma.credential.findMany({
      where: { userId: user.id }
    });
  }

  findOneCredential(id: number) {
    return this.prisma.credential.findUnique({
      where: { id }
    });
  }

  findCredentialByTitle(title: string, userId: number) {
    return this.prisma.credential.findUnique({
      where: {
        title_userId: {
          title,
          userId
        }
      }
    });
  }

  removeCredential(id: number) {
    return this.prisma.credential.delete({
      where: { id }
    });
  }
}
