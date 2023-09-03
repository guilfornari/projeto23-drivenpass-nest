import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';

@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    try {
      return await this.noteService.createNote(user, createNoteDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async findAllNotes(@User() user: UserPrisma) {
    try {
      return await this.noteService.findAllNotes(user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':id')
  async findOneNote(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.noteService.findOneNote(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':id')
  async removeNote(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.noteService.removeNote(+id, user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
