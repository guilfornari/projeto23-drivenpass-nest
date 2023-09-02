import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { credentialRepository } from './credential.repository';
import { User } from '@prisma/client';

@Injectable()
export class CredentialService {

  constructor(private readonly credentialRepository: credentialRepository) { }

  async createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    return await this.credentialRepository.createCredential(user, createCredentialDto);
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
