import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto.js";
import { PrismaService } from "src/database/prisma.service";
import * as bcrypt from "bcrypt";
import { UpdateUsuarioDto } from "./dto/UpdateUsuario.dto.js";

@Injectable()
export class UsuarioService{

    constructor (private prisma: PrismaService){}

    //funcao para achar usuario pelo id
    private async findUserById(id: number) {
        const usuario = await this.prisma.usuario.findUnique({ where: { id: Number(id) },select : {
            id : true,
            nome: true,
            email : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true });
        }})

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

        return this.prisma.usuario.create({ data : { ...data,senha: hashedPassword},select : {
            id : true,
            nome: true,
            email : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true
        } })
    }

    //ReadOne
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
            curso : true,
            departamento : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true
        }})
    }

    //ReadOne
    async findOneID(id:number){
      return this.findUserById(id)
    }

    //Update
    async update(id:number, data: UpdateUsuarioDto){
        if (data.email){
            const verificaEmail = await this.prisma.usuario.findUnique({where: { email: data.email } });
            if (verificaEmail && verificaEmail.id !== id) {
                throw new ConflictException(`Usuário com ${data.email} já cadastrado!`);
            }
        }

        if(data.senha){
            const hashedPassword = await bcrypt.hash(data.senha,10)
            return this.prisma.usuario.update({where : {id : Number(id)}, data : {...data, senha : hashedPassword}, select : {
            id : true,
            nome: true,
            email : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true
        }})}
        return this.prisma.usuario.update({where : {id : Number(id)}, data: data,
        select : {
            id : true,
            nome: true,
            email : true,
            createdAt : true,
            updatedAt : true
          //  avaliacoes: true,
          //  comentarios : true
        }})
    }

    //Delete
    async delete(id:number){
        await this.findUserById(id)
        return this.prisma.usuario.delete({where : { id }})
    }
}

