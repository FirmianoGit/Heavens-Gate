import{} from '@nestjs/mapped-types'
import { PartialType } from '@nestjs/swagger';
import { CreateMembrosDto } from './create-membros.dto'



export class UpdateMembroDto extends PartialType (CreateMembrosDto) {
    
}