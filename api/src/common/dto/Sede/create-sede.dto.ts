import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isDeepStrictEqual } from "util";

export class CreateSedeDto {

    @IsString()
    cnpj: string | null;
    
    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @IsString()
    rua: string | null;
  
    @IsString()
    bairro: string | null;
  
    @IsNumber()
    numero: number | null;
  
    @IsString()
    complemento: string | null;
  
    @IsNumber()
    telefone: number | null;
  
}
