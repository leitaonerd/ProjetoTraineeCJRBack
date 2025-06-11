import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './database/prisma.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { ProfessorModule } from './professor/professor.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth-guard';

@Module({
  imports: [UsuarioModule, PrismaModule, AvaliacoesModule, ProfessorModule,AuthModule,JwtModule,ConfigModule.forRoot({isGlobal: true,})],
  controllers: [],
  providers: [{provide : APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}
