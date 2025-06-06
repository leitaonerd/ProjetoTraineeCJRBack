import { PartialType } from "@nestjs/mapped-types";
import { UsuarioDto } from "./Usuario.dto";

export class UpdateUsuarioDto extends PartialType(UsuarioDto){}