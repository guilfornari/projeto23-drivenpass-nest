import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialRepository } from './credential.repository';
import { Credential, User } from '@prisma/client';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository,
    private readonly cryptoService: CryptoService) { }

  async createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    const title = await this.credentialRepository.findCredentialByTitle(createCredentialDto.title, user.id);
    if (title) throw new ConflictException("You already have a credential with this title");
    return await this.credentialRepository.createCredential(user, {
      ...createCredentialDto,
      credential_password: this.cryptoService.encrypt(createCredentialDto.credential_password)
    });
  }

  async findAllCredentials(user: User) {
    const credentials = await this.credentialRepository.findAllCredentials(user);
    return this.decriptAllCredentials(credentials);
  }

  private decriptAllCredentials(credentials: Credential[]) {
    return credentials.map(credential => {
      return {
        ...credential,
        credential_password: this.cryptoService.decrypt(credential.credential_password)
      }
    });
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
