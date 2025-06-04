import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService, PrismaService],
})
export class ComentarioModule {}