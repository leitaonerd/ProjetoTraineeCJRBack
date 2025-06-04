import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto.js";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsuarioService{

    constructor (private prisma: PrismaService){}

    async create(data: UsuarioDto){
        const usuario = await this.prisma.usuario.create({ data })
        return usuario
    }

    async findAll(){
        return this.prisma.usuario.findMany()
    }

    async update(id:number, data: UsuarioDto){
        const usuarioExists = await this.prisma.usuario.findUnique({
            where: { id }
        })

        if(!usuarioExists){
            throw new NotFoundException('Usuário não encontrado!')
        }

        return await this.prisma.usuario.update({
            where: { id },
            data
        })
    }

    async delete(id:number){
         const usuarioExists = await this.prisma.usuario.findUnique({
            where: { id }
        })

        if(!usuarioExists){
            throw new NotFoundException('Usuário não encontrado!')
        }
    
        return await this.prisma.usuario.delete({
            where : { id, }
        })
    }
}

