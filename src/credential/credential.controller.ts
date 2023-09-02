import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';

@Controller('credential')
@UseGuards(AuthGuard)
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  async createCredential(@Body() createCredentialDto: CreateCredentialDto, @User() user: UserPrisma) {
    try {
      return await this.credentialService.createCredential(user, createCredentialDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async findAllCredentials(@User() user: UserPrisma) {
    try {
      return await this.credentialService.findAllCredentials(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':id')
  async findOneCredential(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.credentialService.findOneCredential(+id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':id')
  async removeCredential(@Param('id') id: string, @User() user: UserPrisma) {
    try {
      return await this.credentialService.removeCredential(+id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
