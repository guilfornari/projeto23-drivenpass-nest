import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("note")
@ApiBearerAuth()
@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  @ApiOperation({ summary: "Creates a new note" })
  @ApiOkResponse({ description: "Note created" })
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    try {
      return await this.noteService.createNote(user, createNoteDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  @ApiOperation({ summary: "Finds all user's notes" })
  @ApiOkResponse({ description: "Returns an array of notes" })
  async findAllNotes(@User() user: UserPrisma) {
    try {
      return await this.noteService.findAllNotes(user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: "Finds one note" })
  @ApiOkResponse({ description: "Returns the wanted note" })
  @ApiNotFoundResponse({ description: "Note does not exist" })
  @ApiForbiddenResponse({ description: "Not your note" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async findOneNote(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.noteService.findOneNote(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes one note" })
  @ApiOkResponse({ description: "Deletes the wanted note" })
  @ApiNotFoundResponse({ description: "Note does not exist" })
  @ApiForbiddenResponse({ description: "Not your note" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async removeNote(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.noteService.removeNote(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
