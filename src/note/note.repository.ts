import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class NoteRepository {

  constructor(private prisma: PrismaService) { }

  createNote(user: User, createNoteDto: CreateNoteDto) {
    const { title, note } = createNoteDto;
    return this.prisma.note.create({
      data: {
        title,
        note,
        user: {
          connect: user
        }
      }
    });
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
