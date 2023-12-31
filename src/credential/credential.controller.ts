import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("credential")
@ApiBearerAuth()
@Controller('credential')
@UseGuards(AuthGuard)
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  @ApiOperation({ summary: "Creates a new credential" })
  @ApiCreatedResponse({ description: "Created" })
  @HttpCode(HttpStatus.CREATED)
  createCredential(@Body() createCredentialDto: CreateCredentialDto, @User() user: UserPrisma) {
    return this.credentialService.createCredential(user, createCredentialDto);
  }

  @Get()
  @ApiOperation({ summary: "Finds all user's credentials" })
  @ApiOkResponse({ description: "Returns an array with all credentials" })
  findAllCredentials(@User() user: UserPrisma) {
    return this.credentialService.findAllCredentials(user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Finds one credential" })
  @ApiOkResponse({ description: "Returns the wanted credential" })
  @ApiNotFoundResponse({ description: "Credential does not exist" })
  @ApiForbiddenResponse({ description: "Not your credential" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async findOneCredential(@Param('id') id: string, @User() user: UserPrisma) {
    const credential = await this.credentialService.findOneCredential(+id, user);
    return credential[0];
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes one credential" })
  @ApiOkResponse({ description: "Deletes the wanted credential" })
  @ApiNotFoundResponse({ description: "Credential does not exist" })
  @ApiForbiddenResponse({ description: "Not your credential" })
  @ApiParam({ name: "id", description: "An integer", example: 42 })
  async removeCredential(@Param('id') id: string, @User() user: UserPrisma) {
    return await this.credentialService.removeCredential(+id, user);
  }
}
