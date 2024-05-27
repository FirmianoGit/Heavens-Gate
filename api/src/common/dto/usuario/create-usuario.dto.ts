import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @IsString()
    chave: string

    @IsNotEmpty()
    @IsString()
    senha: string
}
