import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteRepository } from './note.repository';
import { User } from '@prisma/client';

@Injectable()
export class NoteService {

  constructor(private readonly noteRepository: NoteRepository) { }

  async createNote(user: User, createNoteDto: CreateNoteDto) {
    return await this.noteRepository.createNote(user, createNoteDto);
  }

  async findAllNotes(userId: number) {
    return await this.noteRepository.findAllNotes(userId);
  }

  async findOneNote(id: number, userId: number) {
    const note = await this.noteRepository.findOneNote(id);
    if (!note) throw new HttpException("This note does not exist", HttpStatus.NOT_FOUND);
    if (note.userId !== userId) throw new HttpException("This is not your note", HttpStatus.FORBIDDEN);

    return note;
  }

  async removeNote(id: number, userId: number) {
    const note = await this.noteRepository.findOneNote(id);
    if (!note) throw new HttpException("This note does not exist", HttpStatus.NOT_FOUND);
    if (note.userId !== userId) throw new HttpException("This is not your note", HttpStatus.FORBIDDEN);

    return await this.noteRepository.removeNote(id);
  }
}
