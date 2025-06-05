import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './database/prisma.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';


@Module({
  imports: [UsuarioModule, PrismaModule, AvaliacoesModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
