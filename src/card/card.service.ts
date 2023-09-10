import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './card.repository';
import { Card, User } from '@prisma/client';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository,
    private readonly cryptoService: CryptoService) { }

  async createCard(createCardDto: CreateCardDto, user: User) {
    const title = await this.cardRepository.findCardByTitle(createCardDto.title, user.id);
    if (title) throw new ConflictException("You already have a note with this title");
    return await this.cardRepository.createCard({
      ...createCardDto,
      safeCode: this.cryptoService.encrypt(createCardDto.safeCode),
      password: this.cryptoService.encrypt(createCardDto.password)
    }, user);
  }

  async findAllCards(userId: number) {
    const cards = await this.cardRepository.findAllCards(userId);
    return this.drecriptAllCards(cards);
  }

  private drecriptAllCards(cards: Card[]) {
    return cards.map(card => {
      return {
        ...card,
        safeCode: this.cryptoService.decrypt(card.safeCode),
        password: this.cryptoService.decrypt(card.password)
      }
    });
  }

  async findOneCard(id: number, userId: number) {
    const card = await this.cardRepository.findOneCard(id);
    if (!card) throw new HttpException("This card does not exist", HttpStatus.NOT_FOUND);
    if (card.userId !== userId) throw new HttpException("This is not your card", HttpStatus.FORBIDDEN);

    return this.drecriptAllCards([card]);
  }

  async removeCard(id: number, userId: number) {
    const card = await this.cardRepository.findOneCard(id);
    if (!card) throw new HttpException("This card does not exist", HttpStatus.NOT_FOUND);
    if (card.userId !== userId) throw new HttpException("This is not your card", HttpStatus.FORBIDDEN);

    return await this.cardRepository.removeCard(id);
  }
}
