import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { NumericType } from "typeorm";

export class CreateFrequentaDto {

    @IsNotEmpty()
    @IsNumber()
    membroId: number;

    @IsNotEmpty()
    @IsNumber()
    eventoId: number;

    @IsNotEmpty()
    @IsDate()
    dataHora: Date

}
