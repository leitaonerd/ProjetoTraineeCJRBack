import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateProfessorDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  disciplinaId?: number;
}
