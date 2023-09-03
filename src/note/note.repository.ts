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

  findAllNotes(userId: number) {
    return this.prisma.note.findMany({
      where: { userId }
    });
  }

  findOneNote(id: number) {
    return this.prisma.note.findUnique({
      where: { id }
    });
  }

  removeNote(id: number) {
    return this.prisma.note.delete({
      where: { id }
    });
  }
}
