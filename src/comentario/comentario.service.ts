import { Injectable, NotFoundException } from "@nestjs/common";
import { ComentarioDto } from "./dto/comentario.dto.js";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ComentarioService {
    
    constructor(private prisma: PrismaService) {}

    async create(data: ComentarioDto) {
        const userExists = await this.prisma.usuario.findUnique({
            where: { id: data.usuarioID }
        });
        
        if (!userExists) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        
        return this.prisma.comentario.create({ data });
    }

    //melhorar depois
    async findAll(skip?: number, take?: number) {
        return this.prisma.comentario.findMany({
            skip,
            take,
        });
    }

    async findOne(id: number) {
        const comentario = await this.prisma.comentario.findUnique({
            where: { id }
        });

        if(!comentario) {
            throw new NotFoundException('Comentário não encontrado!');
        }

        return comentario;
    }

    async update(id: number, data: ComentarioDto) {
        const comentarioExists = await this.prisma.comentario.findUnique({
            where: { id }
        });

        if(!comentarioExists) {
            throw new NotFoundException('Comentário não encontrado!');
        }

        return this.prisma.comentario.update({
            where: { id },
            data 
        });
    }

    async delete(id: number) {
        const comentarioExists = await this.prisma.comentario.findUnique({
            where: { id }
        });

        if(!comentarioExists) {
            throw new NotFoundException('Comentário não encontrado!');
        }

        return this.prisma.comentario.delete({
            where: { id },
        });
    }
}