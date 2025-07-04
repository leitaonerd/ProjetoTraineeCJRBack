import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AvaliacoesDto } from './dto/Avaliacoes.dto';
import { UpdateAvaliacoesDto } from './dto/UpdateAvalicacoes.dto';

@Injectable()
export class AvaliacoesService {

    constructor(private prisma: PrismaService){}

    async create(data : AvaliacoesDto){
        return await this.prisma.avaliacao.create({data , select : {id : true, conteudo : true, createdAt : true, updatedAt : true, usuarioID : true, professorID: true, disciplinaID: true
            ,comentarios : true}})
    }

    async findAll(){
        return await this.prisma.avaliacao.findMany({select : {id : true, conteudo : true, createdAt : true, updatedAt : true, usuarioID : true, professorID: true, disciplinaID: true, usuario : true,
            comentarios : {select : {usuario : true, createdAt : true, updatedAt: true, conteudo : true,}}}})
    }

    async findOne(id:number){
        return await this.prisma.avaliacao.findUnique({where : {id: Number(id)}, select : {id : true, conteudo : true, createdAt : true, updatedAt : true, usuarioID : true, professorID: true, disciplinaID: true, usuario : true,
            comentarios : {select : {usuario : true, createdAt : true, updatedAt: true, conteudo : true,}}}})
    }

    async update(id:number,data:UpdateAvaliacoesDto){
        return await this.prisma.avaliacao.update({where : {id: Number(id)},data})

    }
    async delete(id:number){
        return await this.prisma.avaliacao.delete({where:{id : Number(id)}})
    }

}
