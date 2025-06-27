import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DisciplinaDto } from './dto/disciplina.dto';
import { UpdateDisciplinaDto } from './dto/updateDisciplina.dto';

@Injectable()
export class DisciplinaService {
  constructor(private prisma: PrismaService) {}

  async create(data: DisciplinaDto) {
    const disciplina = await this.prisma.disciplina.findFirst({
      where : { nome: data.nome },
    });

    if (disciplina) {
      throw new ConflictException(`Disciplina ${data.nome} ja cadastrado!`);
    }

    return this.prisma.disciplina.create({ data : { nome : data.nome} });
  }

  async findAll() {
    return this.prisma.disciplina.findMany();
  }

  async findOne(id: number) {
    const disciplina = await this.prisma.disciplina.findUnique({
      where: { id },
    });

    if (!disciplina) {
      throw new NotFoundException(`Disciplina com id ${id} não encontrado.`);
    }

    return disciplina;
  }

  async update(id: number, data: UpdateDisciplinaDto) {
    await this.findOne(id);
    if (data.nome) {
      const verificaNome = await this.prisma.disciplina.findFirst({
        where: { nome: data.nome },
      });
      if (verificaNome) {
        throw new ConflictException(`Disciplina ${data.nome} já existe`);
      }
    }
    return this.prisma.disciplina.update({
      where: { id },
      data : {nome: data.nome,},
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prisma.disciplina.delete({ where: { id } });
  }
}