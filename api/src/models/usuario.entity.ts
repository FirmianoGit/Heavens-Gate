import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Gestor } from "src/models/gestor.entity"; 
  import { Membro } from "src/models/membros.entity";
  
  @Index("CHAVE", ["chave"], { unique: true })
  @Index("SENHA", ["senha"], { unique: true })
  @Entity("usuario", { schema: "heavenpath" })
  export class Usuario {
    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;
  
    @Column("varchar", { name: "CHAVE", unique: true, length: 99 })
    chave: string;
  
    @Column("varchar", { name: "SENHA", unique: true, length: 45 })
    senha: string;
  
    @OneToMany(() => Gestor, (gestor) => gestor.usuario)
    gestors: Gestor[];
  
    @OneToMany(() => Membro, (membro) => membro.usuario)
    membros: Membro[];
  }
  