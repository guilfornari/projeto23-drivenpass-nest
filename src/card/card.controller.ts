import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';

@Controller('card')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    try {
      return this.cardService.createCard(createCardDto, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async findAllCards(@User() user: UserPrisma) {
    try {
      return await this.cardService.findAllCards(user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':id')
  async findOneCard(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.cardService.findOneCard(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':id')
  async removeCard(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return this.cardService.removeCard(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
