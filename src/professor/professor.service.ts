import { PrismaService } from 'src/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfessorDto } from './dto/professor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  private async findProfessorById(id: Number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        departamento: true,
        createdAt: true,
        updatedAt: true,
        disciplinaID: true,
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
        disciplina: {
          select: {
            nome: true,
          },
        },
      },
    });

    if (!professor) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }

    return professor;
  }

  async create(data: ProfessorDto) {
    const professor = await this.prisma.professor.findFirst({
      where: { nome: data.nome },
    });

    if (professor) {
      throw new NotFoundException(`Professor ${data.nome} ja existe!`);
    }

    return this.prisma.professor.create({
      data: {
        nome: data.nome,
        departamento: data.departamento,
        disciplinaID: data.disciplinaID,
      },
    });
  }

  async findAll() {
    return this.prisma.professor.findMany();
  }

  async findOneID(id: Number) {
    return this.findProfessorById(id);
  }

  async update(id: Number, data: UpdateProfessorDto) {
    // Verifica se professor existe
    const professor = await this.findProfessorById(id);

    if (!professor) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }

    return this.prisma.professor.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    await this.findProfessorById(id);
    return this.prisma.professor.delete({ where: { id: Number(id) } });
  }
}
