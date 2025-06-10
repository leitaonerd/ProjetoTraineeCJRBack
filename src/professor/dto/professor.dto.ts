import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProfessorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsInt()
  @IsNotEmpty()
  disciplinaID: number;
}
