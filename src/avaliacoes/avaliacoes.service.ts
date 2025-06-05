import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AvaliacoesDto } from './dto/Avaliacoes.dto';

@Injectable()
export class AvaliacoesService {

    constructor(private prisma: PrismaService){}

    async create(data : AvaliacoesDto){
        return await this.prisma.avaliacao.create({data})
    }

    async findAll(){
        return await this.prisma.avaliacao.findMany()
    }

    async findOne(id:number){
        return await this.prisma.avaliacao.findUnique({where : {id: Number(id)}})
    }

    async update(id:number,data:AvaliacoesDto){
        return await this.prisma.avaliacao.update({where : {id: Number(id)},data})

    }
    async delete(id:number){
        return await this.prisma.avaliacao.delete({where:{id : Number(id)}})
    }

}
