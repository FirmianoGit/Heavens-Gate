import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCongregacaoDto {

    @IsInt()
    id: number;
  
    @IsString()
    cnpj: string | null;
  
    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @IsString()
    @IsNotEmpty()
    rua: string;
  
    @IsString()
    @IsNotEmpty()
    bairro: string;
  
    @IsInt()
    @IsNotEmpty()
    numero: number;
  
    @IsString()
    complemento: string | null;
  
    @IsInt()
    telefone: number | null;
  
    @IsInt()
    gestorId: number | null;
  
    @IsInt()
    sedeId: number | null;

}
