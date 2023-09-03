import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteRepository } from './note.repository';
import { User } from '@prisma/client';

@Injectable()
export class NoteService {

  constructor(private readonly noteRepository: NoteRepository) { }

  async createNote(user: User, createNoteDto: CreateNoteDto) {
    return await this.noteRepository.createNote(user, createNoteDto);
  }

  findAll() {
    return `This action returns all note`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
