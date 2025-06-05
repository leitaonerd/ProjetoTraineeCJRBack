import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';


export class AvaliacoesDto {
    @IsNumber()
    @IsNotEmpty()
    usuarioID : number

    @IsNumber()
    @IsNotEmpty()
    professorID : number

    @IsNumber()
    @IsNotEmpty()
    disciplinaID : number

    @IsString()
    @IsNotEmpty()
    conteudo : string
}