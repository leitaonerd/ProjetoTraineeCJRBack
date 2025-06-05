import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto.js";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsuarioService{

    constructor(private prisma: PrismaService){}

    //funcao para achar usuario pelo id
    private async findUserById(id: number) {
        const usuario = await this.prisma.usuario.findUnique({where: { id: Number(id) } });

        if (!usuario) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }

        return usuario;
    }

    // --------------------CRUD--------------------//
    
    async create(data: UsuarioDto){
        const usuario = await this.prisma.usuario.findUnique({where : {email : data.email}})

        if(usuario){
            throw new ConflictException(`Usuário com ${data.email} ja cadastrado!`)
        }

        return this.prisma.usuario.create({ data })
    }

    async findAll(){
        return this.prisma.usuario.findMany()
    }

    async findOneID(id:number){
      return this.findUserById(id)
    }

    async update(id:number, data: UsuarioDto){
        const usuarioExistente = await this.findOneID(id)
        if(usuarioExistente){
            const verificaEmail = await this.prisma.usuario.findUnique({where: {email : data.email}})
            if(verificaEmail){
                throw new ConflictException(`Usuário com ${data.email} ja cadastrado!`)
            }
        }
        return this.prisma.usuario.update({where : {id : Number(id)},data})
    }

    async delete(id:number){
        await this.findUserById(id)
        return this.prisma.usuario.delete({where : { id } })
    }
}

