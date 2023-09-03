import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialRepository } from './credential.repository';
import { User } from '@prisma/client';

@Injectable()
export class CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository) { }

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

  async findOneCredential(id: number, user: User) {

    const credential = await this.credentialRepository.findOneCredential(id);
    if (!credential) throw new HttpException("This credential does not exist", HttpStatus.NOT_FOUND);
    if (credential.userId !== user.id) throw new HttpException("Not your credential", HttpStatus.FORBIDDEN);

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');

    const decryptedCredential = {
      id: credential.id,
      title: credential.title,
      url: credential.url,
      username: credential.username,
      credential_password: cryptr.decrypt(credential.credential_password),
      userId: credential.userId
    }
    return decryptedCredential;
  }

  async removeCredential(id: number, user: User) {

    const credential = await this.credentialRepository.findOneCredential(id);
    if (!credential) throw new HttpException("This credential does not exist", HttpStatus.NOT_FOUND);
    if (credential.userId !== user.id) throw new HttpException("Not your credential", HttpStatus.FORBIDDEN);

    return this.credentialRepository.removeCredential(id);
  }
}
