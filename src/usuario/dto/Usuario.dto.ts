import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';


export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    email: string 

    @IsString()
    @IsNotEmpty()
    senha: string 

    @IsString()
    departamento: string

    @IsString()
    curso: string 
}
