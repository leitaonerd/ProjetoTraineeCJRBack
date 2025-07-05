import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorDto } from './dto/professor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import type { Multer } from 'multer';

@Controller('professores')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Post()
  async create(@Body() data: ProfessorDto) {
    return this.professorService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.professorService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneByID(@Param('id') id: number) {
    return this.professorService.findOneID(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProfessorDto) {
    return this.professorService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.professorService.delete(+id);
  }
}
