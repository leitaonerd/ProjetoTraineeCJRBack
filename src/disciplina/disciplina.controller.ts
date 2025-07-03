import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaDto } from './dto/disciplina.dto';
import { UpdateDisciplinaDto } from './dto/updateDisciplina.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Public()
  @Post()
  async create(@Body() data: DisciplinaDto) {
    return this.disciplinaService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.disciplinaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.disciplinaService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateDisciplinaDto) {
    return this.disciplinaService.update(Number(+id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.disciplinaService.delete(+id);
  }
}