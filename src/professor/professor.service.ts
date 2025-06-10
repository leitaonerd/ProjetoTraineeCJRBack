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
    });

    if (!professor) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }

    return professor;
  }

  async create(data: ProfessorDto) {
    const professor = await this.prisma.professor.findUnique({
      where: { nome: data.nome },
    });

    if (professor) {
      throw new NotFoundException(`Professor ${data.nome} ja existe!`);
    }

    return this.prisma.professorcreate({ data });
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

    // Verifica se disciplinaId existe, caso tenha sido preenchido
    const disciplinaId = await this.prisma.disciplina.findUnique({
      where: { id: data.disciplinaId },
    });

    if (!disciplinaId) {
      throw new NotFoundException(
        `Disciplina com id ${data.disciplinaId} não encontrada.`,
      );
    }

    return this.prisma.professor.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findProfessorById(id);
    return this.prisma.professor.delete({ where: { id } });
  }
}
