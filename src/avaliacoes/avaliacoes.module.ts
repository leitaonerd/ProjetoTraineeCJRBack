import { Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { PrismaService } from 'src/database/prisma.service';
import { AvaliacoesController } from './avaliacoes.controller';

@Module({
    providers : [AvaliacoesService,PrismaService],
    controllers : [AvaliacoesController]
})
export class AvaliacoesModule {}
