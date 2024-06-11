import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Congregacao } from "./congregacao.entity";
  import { Sede } from "./sede.entity";
  import { Usuario } from "./usuario.entity";

  @Index("CPF", ["cpf"], { unique: true })
  @Index("ID", ["id"], {})
  @Entity("gestor", { schema: "heavenpath" })
  
  export class Gestor {

    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;
  
    @Column("varchar", { name: "NOME", length: 45 })
    nome: string;
  
    @Column("varchar", { name: "CPF", unique: true, length: 15 })
    cpf: string;

    @OneToMany(() => Congregacao, (congregacao) => congregacao.gestorId)
    congregacaos: Congregacao[];

    @JoinColumn([{ name: "id", referencedColumnName: "id" }])
    usuario: Usuario;

    @OneToMany(() => Sede, (sede) => sede.gestor)
    sedes: Sede[];

  }
