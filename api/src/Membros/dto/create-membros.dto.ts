import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { NumericType } from 'typeorm';
export class CreateMembrosDto {
    
    @IsNotEmpty()
    @IsString()
    readonly Nome: string;

    @IsString()
    @IsNotEmpty()
    readonly Naturalidade: string;

    @IsString()
    @IsNotEmpty()
    readonly Identidade: string;

    @IsString()
    @IsNotEmpty()
    readonly EstadoCivil: string;

    @IsInt()
    @IsNotEmpty()
    readonly CPF: number;

}
 