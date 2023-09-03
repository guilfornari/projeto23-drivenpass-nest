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
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
