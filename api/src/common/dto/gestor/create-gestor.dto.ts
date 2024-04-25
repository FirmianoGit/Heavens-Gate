import{ IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateGestorDto {

    @IsInt()
    id: number;
  
    @IsNotEmpty()
    @IsString()
    nome: string;
  
    @IsNotEmpty()
    @IsString()
    cpf: string;
  
    @IsInt()
    usuarioId: number | null;
}
