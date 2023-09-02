import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
