import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto.js";
import { PrismaService } from "src/database/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioService{

    constructor (private prisma: PrismaService){}

    //funcao para achar usuario pelo id
    private async findUserById(id: number) {
        const usuario = await this.prisma.usuario.findUnique({ where: { id: Number(id) } });

        if (!usuario) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }

        return usuario;
    }

    // --------------------CRUD--------------------//
    
    //Create
    async create(data: UsuarioDto){
        const usuario = await this.prisma.usuario.findUnique({where : {email : data.email}})

        if(usuario){
            throw new ConflictException(`Usuário com ${data.email} ja cadastrado!`)
        }

        const hashedPassword = await bcrypt.hash(data.senha,10)

        return this.prisma.usuario.create({ data : { ...data,senha: hashedPassword} })
    }

    async findByEmail(email:string){
        const usuario = await this.prisma.usuario.findUnique({where : {email : email}})

        if(!usuario){
            return null
        }

        return usuario
    }

    //Read
    async findAll(){
        return this.prisma.usuario.findMany( {select : {
            id : true,
            nome: true,
            email : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true
        },})
    }

    //ReadOne
    async findOneID(id:number){
      return this.findUserById(id)
    }

    //Update
    async update(id:number, data: UsuarioDto){
        const usuarioExistente = await this.findOneID(id)
        
        if(usuarioExistente){
            if(data.email){
                const verificaEmail = await this.prisma.usuario.findUnique({where: {email : data.email}})
            
                if(verificaEmail && verificaEmail.id !== id){ //o usuario pode atualizar o email com o proprio email
                    throw new ConflictException(`Usuário com ${data.email} ja cadastrado!`)
                }
            }
        }   
        return this.prisma.usuario.update({where : {id : Number(id)},data})
    }

    //Delete
    async delete(id:number){
        await this.findUserById(id)
        return this.prisma.usuario.delete({where : { id } })
    }
}

