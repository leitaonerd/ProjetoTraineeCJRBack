import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesDto } from './dto/Avaliacoes.dto';
import { UpdateAvaliacoesDto } from './dto/UpdateAvalicacoes.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { CurrentUser } from 'src/auth/decorators/CurrentUser';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('avaliacoes')

export class AvaliacoesController {

    constructor(private readonly avaliacoesService : AvaliacoesService){}

    @Post()
    async create(@Body() data:AvaliacoesDto, @CurrentUser() CurrentUser : UserPayload) {
        if (data.usuarioID !== CurrentUser.sub) {
            throw new UnauthorizedException(
                'Avaliação não pode ser criada para outro usuário',
            );
        }
        return this.avaliacoesService.create(data)  
    }

    @Public()
    @Get()
    async findAll(){
        return this.avaliacoesService.findAll()
    }

    @Public()
    @Get(":id")
    async findOne(@Param("id") id:number){
        return this.avaliacoesService.findOne(id)
    }

    @Put(":id")
    async update(@Param("id") id:number, @Body() data:UpdateAvaliacoesDto , @CurrentUser() CurrentUser : UserPayload) {
        const avaliacao = await this.avaliacoesService.findOne(id);
         if (avaliacao?.usuarioID !== CurrentUser.sub) {
          throw new UnauthorizedException(
            'Avaliação não pode ser atualizado por outro usuário',
          );
        }
        return this.avaliacoesService.update(id,data)
    }

    @Delete(":id")
    async delete(@Param("id") id:number, @CurrentUser() CurrentUser : UserPayload) {
        const avaliacao = await this.avaliacoesService.findOne(id);
        if (avaliacao?.usuarioID !== CurrentUser.sub) {
          throw new UnauthorizedException(
            'Avaliação não pode ser deletada por outro usuário',
          );
        }
        return this.avaliacoesService.delete(id)
    }
}
