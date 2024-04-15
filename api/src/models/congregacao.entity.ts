import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from "typeorm";

  @Index("GESTOR_ID", ["gestorId"], {})
  @Index("SEDE_ID", ["sedeId"], {})
  @Entity("congregacao", { schema: "heavenpath" })
  export class Congregacao {
    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;
  
    @Column("varchar", { name: "CNPJ", nullable: true, length: 20 })
    cnpj: string | null;
  
    @Column("varchar", { name: "NOME", length: 99 })
    nome: string;
  
    @Column("varchar", { name: "RUA", length: 60 })
    rua: string;
  
    @Column("varchar", { name: "BAIRRO", length: 30 })
    bairro: string;
  
    @Column("int", { name: "NUMERO" })
    numero: number;
  
    @Column("varchar", { name: "COMPLEMENTO", nullable: true, length: 30 })
    complemento: string | null;
  
    @Column("int", { name: "TELEFONE", nullable: true })
    telefone: number | null;
  
    @Column("int", { name: "GESTOR_ID", nullable: true })
    gestorId: number | null;
  
    @Column("int", { name: "SEDE_ID", nullable: true })
    sedeId: number | null;
  
  }
  
