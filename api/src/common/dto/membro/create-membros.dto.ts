import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator'
import { NumericType } from 'typeorm';

export class CreateMembrosDto {
    
    @IsInt()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @IsString()
    @IsNotEmpty()
    naturalidade: string;
  
    @IsString()
    @IsNotEmpty()
    identidade: string;
  
    @IsString()
    @IsNotEmpty()
    estadoCivil: string;
  
    @IsString()
    @IsNotEmpty()
    cpf: string;
  
    @IsString()
    profissao: string | null;
  
    @IsString()
    ocupacao: string | null;
  
    @IsString()
    ref: string | null;
  
    @IsString()
    nomePai: string | null;
  
    @IsString()
    nomeMae: string | null;
  
    @IsString()
    nomeConjuge: string | null;
  
    @IsString()
    dataConversao: string | null;
  
    @IsString()
    dataNascimento: string | null;
  
    @IsString()
    dataBatismo: string | null;
  
    @IsString()
    dataBatismoEspSanto: string | null;
  
    @IsString()
    dataAdmissao: string | null;
  
    @IsString()
    dataCancelamento: string | null;
  
    @IsString()
    dataReadmissao: string | null;
  
    @IsString()
    lugarCongrega: string | null;
  
    @IsString()
    classeEscDominical: string | null;
  
    @IsString()
    rua: string | null;
  
    @IsString()
    bairro: string | null;
  
    @IsInt()
    numero: number | null;
  
    @IsString()
    complemento: string | null;
  
    @IsString()
    procedencia: string | null;
  
    @IsString()
    motivoDestino: string | null;
  
    @IsString()
    lugarConversao: string | null;
  
    @IsString()
    lugarBatismo: string | null;
  
    @IsString()
    lugarBatismoEspSanto: string | null;
  
    @IsString()
    atividadesNaIgreja: string | null;
  
    @IsInt()
    congregacaoId: number | null;
  
    @IsInt()
    usuarioId: number | null;

}
 