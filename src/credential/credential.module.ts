import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { credentialRepository } from './credential.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CredentialController],
  providers: [CredentialService, credentialRepository, UserService, UserRepository],
})
export class CredentialModule { }
