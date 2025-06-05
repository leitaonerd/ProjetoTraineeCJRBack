import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesDto } from './dto/Avaliacoes.dto';

@Controller('avaliacoes')

export class AvaliacoesController {

    constructor(private readonly avaliacoesService : AvaliacoesService){}


    @Post()
    async create(@Body() data:AvaliacoesDto){
        return this.avaliacoesService.create(data)
    }

    @Get()
    async findAll(){
        return this.avaliacoesService.findAll()
    }

    @Get(":id")
    async findOne(@Param("id") id:number){
        return this.avaliacoesService.findOne(id)
    }

    @Put(":id")
    async update(@Param("id") id:number, @Body() data:AvaliacoesDto){
        return this.avaliacoesService.update(id,data)
    }

    @Delete(":id")
    async delete(@Param("id") id:number){
        return this.avaliacoesService.delete(id)
    }
}
