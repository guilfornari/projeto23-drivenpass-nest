import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [CryptoService, BcryptService],
  exports: [CryptoService, BcryptService]
})
export class CryptoModule { }
