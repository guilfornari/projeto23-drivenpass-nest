import { Injectable } from '@nestjs/common';
import Cryptr from 'cryptr';

@Injectable()
export class CryptoService {

    private crypt: Cryptr;
    private SALT = 10;

    constructor() {
        const Cryptr = require('cryptr');
        this.crypt = new Cryptr(process.env.CRYPTR_SECRET);
    }

    encrypt(data: string) {
        return this.crypt.encrypt(data);
    }

    decrypt(encryptedValue: string) {
        return this.crypt.decrypt(encryptedValue);
    }
}
