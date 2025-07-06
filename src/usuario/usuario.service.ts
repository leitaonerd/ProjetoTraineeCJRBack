import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioDto } from './dto/Usuario.dto.js';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/UpdateUsuario.dto.js';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  //funcao para achar usuario pelo id
  private async findUserById(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: {
          select: {
            id: true,
            conteudo: true,
            createdAt: true,
            updatedAt: true,
            usuarioID: true,
            professorID: true,
            disciplinaID: true,
            comentarios: true,
          },
        },
        comentarios: true,
        fotoPerfil: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    return usuario;
  }

  // --------------------CRUD--------------------//

  //Create
  async create(data: UsuarioDto, file?: Express.Multer.File) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (usuario) {
      throw new ConflictException(`Usuário com ${data.email} ja cadastrado!`);
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    let fotoUrl: string | undefined = undefined;

    if (file) {
      // Cria um nome de arquivo único para evitar sobreposições
      const fileName = `${Date.now()}-${file.originalname}`;
      // Define o caminho físico onde o arquivo será salvo
      const filePath = join(__dirname, '..', '..', 'uploads', fileName);

      // Escreve o buffer do arquivo no caminho definido
      await writeFile(filePath, file.buffer);

      // Define a URL que será salva no banco de dados
      fotoUrl = `/uploads/${fileName}`;
    }

    return this.prisma.usuario.create({
      data: { ...data, senha: hashedPassword, fotoPerfil: fotoUrl },
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: {
          select: {
            id: true,
            conteudo: true,
            createdAt: true,
            updatedAt: true,
            usuarioID: true,
            professorID: true,
            disciplinaID: true,
            comentarios: true,
          },
        },
        comentarios: true,
        curso: true,
        departamento: true,
        fotoPerfil: true,
      },
    });
  }

  //ReadOne
  async findByEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  //Read
  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: {
          select: {
            id: true,
            conteudo: true,
            createdAt: true,
            updatedAt: true,
            usuarioID: true,
            professorID: true,
            disciplinaID: true,
            comentarios: true,
          },
        },
        comentarios: true,
        fotoPerfil: true,
      },
    });
  }

  //ReadOne
  async findOneID(id: number) {
    return this.findUserById(id);
  }

  //Update
  async update(id: number, data: UpdateUsuarioDto, file?: Express.Multer.File) {
    if (data.email) {
      const verificaEmail = await this.prisma.usuario.findUnique({
        where: { email: data.email },
      });
      if (verificaEmail && verificaEmail.id !== id) {
        throw new ConflictException(`Usuário com ${data.email} já cadastrado!`);
      }
    }

    const dataToUpdate: any = { ...data };

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = join(process.cwd(), 'uploads', fileName);
      await writeFile(filePath, file.buffer);
      dataToUpdate.fotoPerfil = `/uploads/${fileName}`;
    }

    if (data.senha) {
      dataToUpdate.senha = await bcrypt.hash(data.senha, 10);
    }

    return this.prisma.usuario.update({
      where: { id: Number(id) },
      data: dataToUpdate,
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        createdAt: true,
        updatedAt: true,
        avaliacoes: true,
        comentarios: true,
        fotoPerfil: true,
      },
    });
  }

  //Delete
  async delete(id: number) {
    await this.findUserById(id);
    return this.prisma.usuario.delete({ where: { id } });
  }
}
