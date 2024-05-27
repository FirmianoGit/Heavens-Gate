import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHistoricoDto {

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsDate()
    dataHora: Date | null;

    @IsNumber()
    membroId: number;

}
