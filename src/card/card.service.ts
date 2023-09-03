import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './card.repository';
import { User } from '@prisma/client';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) { }

  async createCard(createCardDto: CreateCardDto, user: User) {
    return await this.cardRepository.createCard(createCardDto, user);
  }

  async findAllCards(userId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');
    const cards = await this.cardRepository.findAllCards(userId);
    const decryptedCards = cards.map((c) => {
      return { ...c, safeCode: cryptr.decrypt(c.safeCode), password: cryptr.decrypt(c.password) }
    });
    return decryptedCards;
  }

  async findOneCard(id: number, userId: number) {
    const card = await this.cardRepository.findOneCard(id);
    if (!card) throw new HttpException("This card does not exist", HttpStatus.NOT_FOUND);
    if (card.userId !== userId) throw new HttpException("This is not your card", HttpStatus.FORBIDDEN);

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');

    const decryptedCard = {
      id: card.id,
      title: card.title,
      number: card.number,
      name: card.name,
      safeCode: cryptr.decrypt(card.safeCode),
      expDate: card.expDate,
      password: cryptr.decrypt(card.password),
      virtual: card.virtual,
      type: card.type,
      userId: card.userId
    }
    return decryptedCard;
  }

  async removeCard(id: number, userId: number) {
    const card = await this.cardRepository.findOneCard(id);
    if (!card) throw new HttpException("This card does not exist", HttpStatus.NOT_FOUND);
    if (card.userId !== userId) throw new HttpException("This is not your card", HttpStatus.FORBIDDEN);

    return await this.cardRepository.removeCard(id);
  }
}
