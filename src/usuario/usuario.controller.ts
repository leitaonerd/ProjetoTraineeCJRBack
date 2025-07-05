import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioDto } from './dto/Usuario.dto';
import { UsuarioService } from './usuario.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { UpdateUsuarioDto } from './dto/UpdateUsuario.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import type { Multer } from 'multer';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  @Post()
  async create(
    @Body() data: UsuarioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usuarioService.create(data, file);
  }

  @Public()
  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneByID(@Param('id') id: number) {
    return this.usuarioService.findOneID(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUsuarioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.update(Number(id), data, file);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usuarioService.delete(Number(id));
  }
}
