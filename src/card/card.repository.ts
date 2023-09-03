import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) { }

  createCard(createCardDto: CreateCardDto, user: User) {
    const { title, number, name, safeCode, expDate, password, virtual, type } = createCardDto;

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('myTotallySecretKey');
    const encryptedsc = cryptr.encrypt(safeCode);
    const encryptedpw = cryptr.encrypt(password);

    return this.prisma.card.create({
      data: {
        title,
        number,
        name,
        safeCode: encryptedsc,
        expDate,
        password: encryptedpw,
        virtual,
        type,
        user: {
          connect: user
        }
      }
    });
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
