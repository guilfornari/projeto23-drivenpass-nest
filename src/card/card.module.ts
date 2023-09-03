import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CardRepository } from './card.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CardController],
  providers: [CardService, CardRepository, UserService, UserRepository],
})
export class CardModule { }
