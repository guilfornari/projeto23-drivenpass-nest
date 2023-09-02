import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class credentialRepository {

  constructor(private prisma: PrismaService) { }

  createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    const { title, url, username, credential_password } = createCredentialDto;
    return this.prisma.credential.create({
      data: {
        title,
        url,
        username,
        credential_password,
        user: {
          connect: user
        }
      }
    });
  }

  findAll() {
    return `This action returns all credential`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
