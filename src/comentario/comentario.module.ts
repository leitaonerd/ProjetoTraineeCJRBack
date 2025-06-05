import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
	providers: [ComentarioService, PrismaService],
  	controllers: [ComentarioController],
})

export class ComentarioModule {}