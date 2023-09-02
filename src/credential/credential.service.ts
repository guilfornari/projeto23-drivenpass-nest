import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { credentialRepository } from './credential.repository';
import { User } from '@prisma/client';
import { title } from 'process';

@Injectable()
export class CredentialService {

  constructor(private readonly credentialRepository: credentialRepository) { }

  async createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    return await this.credentialRepository.createCredential(user, createCredentialDto);
  }

  async findAllCredentials(user: User) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');
    const credentials = await this.credentialRepository.findAllCredentials(user);
    const decryptedCredentials = credentials.map((c) => {
      return { ...c, credential_password: cryptr.decrypt(c.credential_password) }
    });

    return decryptedCredentials;
  }

  findOneCredential(id: number) {
    return this.credentialRepository.findOneCredential(id);
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
