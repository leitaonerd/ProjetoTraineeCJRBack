import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ComentarioDto {
    @IsInt()
    @IsNotEmpty()
    usuarioID: number;

    @IsInt()
    @IsNotEmpty()
    avaliacaoID: number; 

    @IsString()
    @IsNotEmpty()
    conteudo: string; 
}
