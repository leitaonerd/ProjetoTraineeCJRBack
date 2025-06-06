import { PartialType } from "@nestjs/mapped-types";
import { AvaliacoesDto } from "./Avaliacoes.dto";

export class UpdateAvaliacoesDto extends PartialType(AvaliacoesDto){}