import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  imports : [UsuarioModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,UsuarioService],
})
export class AuthModule {}
