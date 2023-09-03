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
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
