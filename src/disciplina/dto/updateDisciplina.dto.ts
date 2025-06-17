import { PartialType } from '@nestjs/mapped-types';
import { DisciplinaDto } from './disciplina.dto';

export class UpdateDisciplinaDto extends PartialType(DisciplinaDto) {}
