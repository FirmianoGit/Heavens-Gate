import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGrupoDto {

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsInt()
    congregacaoId: number | null;
}
