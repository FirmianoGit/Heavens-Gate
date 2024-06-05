import { PartialType } from '@nestjs/mapped-types';
import { CreateFrequentaDto } from './create-frequenta.dto';

export class UpdateFrequentaDto extends PartialType(CreateFrequentaDto) {}
