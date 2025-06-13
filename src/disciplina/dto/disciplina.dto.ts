import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DisciplinaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  professoresID: number;
}
