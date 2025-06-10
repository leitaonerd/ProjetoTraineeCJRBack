import { PartialType } from "@nestjs/mapped-types";
import { ComentarioDto } from "./comentario.dto";

export class UpdateUsuarioDto extends PartialType(ComentarioDto){}