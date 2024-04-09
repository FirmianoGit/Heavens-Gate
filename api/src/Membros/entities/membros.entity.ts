import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Membros {


  @Column({name:'NOME', length: 60})
  Nome: string;

  @Column({name:'NATURALIDADE', length: 20})
  Naturalidade: string;

  @Column({name:'IDENTIDADE', length: 15})
  Identidade: string;

  @Column({name:'ESTADO_CIVIL', length: 15})
  EstadoCivil: string;

  @Column({name:'CPF'})
  @PrimaryColumn() 
  CPF: number;

} 