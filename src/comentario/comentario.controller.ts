import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComentarioDto } from './dto/comentario.dto';
import { ComentarioService } from './comentario.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('comentario')
export class ComentarioController {
    constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(@Body() data: ComentarioDto) {
    return this.comentarioService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.comentarioService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: ComentarioDto) {
    return this.comentarioService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.comentarioService.delete(Number(id));
  }
}