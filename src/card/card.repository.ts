import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) { }

  createCard(createCardDto: CreateCardDto, user: User) {

    return this.prisma.card.create({
      data: {
        ...createCardDto,
        user: {
          connect: user
        }
      }
    });
  }

  findCardByTitle(title: string, userId: number) {
    return this.prisma.card.findUnique({
      where: {
        title_userId: {
          title,
          userId
        }
      }
    })
  }

  findAllCards(userId: number) {
    return this.prisma.card.findMany({
      where: { userId }
    });
  }

  findOneCard(id: number) {
    return this.prisma.card.findUnique({
      where: { id }
    });
  }

  removeCard(id: number) {
    return this.prisma.card.delete({
      where: { id }
    });
  }
}
