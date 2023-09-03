import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CredentialModule } from './credential/credential.module';
import { NoteModule } from './note/note.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CredentialModule, NoteModule, CardModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
