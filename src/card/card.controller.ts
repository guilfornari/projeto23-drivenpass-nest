import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("card")
@ApiBearerAuth()
@Controller('card')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  @ApiOperation({ summary: "Creates a new card information" })
  @ApiCreatedResponse({ description: "Card saved" })
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
    return this.cardService.createCard(createCardDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Returns all user's cards" })
  @ApiOkResponse({ description: "Returns an array of cards" })
  async findAllCards(@User() user: UserPrisma) {
    return await this.cardService.findAllCards(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: "Returns one card" })
  @ApiOkResponse({ description: "Returns the wanted card" })
  @ApiNotFoundResponse({ description: "Card does not exist" })
  @ApiForbiddenResponse({ description: "Not your card" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async findOneCard(@Param('id') id: string, @User() user: UserPrisma) {
    const card = await this.cardService.findOneCard(+id, user.id);
    return card[0];
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes one card" })
  @ApiOkResponse({ description: "Deletes the wanted card" })
  @ApiNotFoundResponse({ description: "Card does not exist" })
  @ApiForbiddenResponse({ description: "Not your card" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async removeCard(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardService.removeCard(+id, user.id);
  }
}
