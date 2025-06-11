import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto";
import { UsuarioService } from "./usuario.service";
import { Public } from "src/auth/decorators/isPublic.decorator";
import { UpdateUsuarioDto } from "./dto/UpdateUsuario.dto";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post()
  async create(@Body() data: UsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOneByID(@Param('id') id: number) {
    return this.usuarioService.findOneID(id);
  }

  @Put(":id")
    async update(@Param("id") id:number,@Body() data:UpdateUsuarioDto){
        return this.usuarioService.update(Number(id),data)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usuarioService.delete(Number(id));
  }
}
