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

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedpw = cryptr.encrypt(credential_password);
    const dc = cryptr.decrypt(encryptedpw);
    console.log(dc);

    return this.prisma.credential.create({
      data: {
        title,
        url,
        username,
        credential_password: encryptedpw,
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

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
