import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGrupoDto {

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsInt()
    congregacaoId: number | null;
}
