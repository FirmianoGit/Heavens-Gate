import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventoDto {

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsDate()
    @IsNotEmpty()
    dataInicio: Date;

    @IsDate()
    @IsNotEmpty()
    dataFim: Date;

    @IsNumber()
    congregacaoId: number;
}
