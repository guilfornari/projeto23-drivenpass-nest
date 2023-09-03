import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './card.repository';
import { User } from '@prisma/client';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) { }

  async createCard(createCardDto: CreateCardDto, user: User) {
    return await this.cardRepository.createCard(createCardDto, user);
  }

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
