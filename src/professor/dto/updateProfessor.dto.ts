import { PartialType } from "@nestjs/mapped-types";
import { ProfessorDto } from './professor.dto';

export class UpdateProfessorDto extends PartialType(ProfessorDto){}
