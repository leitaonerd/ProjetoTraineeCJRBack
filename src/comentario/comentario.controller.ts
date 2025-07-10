import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ComentarioDto } from './dto/comentario.dto';
import { ComentarioService } from './comentario.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { CurrentUser } from 'src/auth/decorators/CurrentUser';

@Controller('comentario')
export class ComentarioController {
    constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(@Body() data: ComentarioDto, @CurrentUser() CurrentUser: UserPayload) {
    if (data.usuarioID !== CurrentUser.sub) {
          throw new UnauthorizedException(
            'Comentário não pode ser criado para outro usuário',
          );
        }
    return this.comentarioService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.comentarioService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: ComentarioDto, @CurrentUser() CurrentUser: UserPayload) {
     const comentario = await this.comentarioService.findOne(id);
     if (comentario.usuarioID !== CurrentUser.sub) {
          throw new UnauthorizedException(
            'Comentário não pode ser atualizado por outro usuário',
          );
        }
    return this.comentarioService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number , @CurrentUser() CurrentUser: UserPayload) {
     const comentario = await this.comentarioService.findOne(id);
     if (comentario.usuarioID!== CurrentUser.sub) {
          throw new UnauthorizedException(
            'Comentário não pode ser deletado por outro usuário',
          );
        }
    return this.comentarioService.delete(Number(id));
  }
}