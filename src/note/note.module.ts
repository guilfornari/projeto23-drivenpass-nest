import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NoteRepository } from './note.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository, UserService, UserRepository],
})
export class NoteModule { }
