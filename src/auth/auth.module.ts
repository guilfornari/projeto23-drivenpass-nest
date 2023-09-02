import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
  exports: [AuthService]
})
export class AuthModule { }
