import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from "typeorm";
  import { Gestor } from "./gestor.entity";
import { Sede } from "./sede.entity";
import { Evento } from "./evento.entity";
import { Grupo } from "src/models/grupo.entity";
import { Membro } from "./membros.entity";

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

  @ManyToOne(() => Gestor, (gestor) => gestor.congregacaos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "GESTOR_ID", referencedColumnName: "id" }])
  gestor: Gestor;

  @ManyToOne(() => Sede, (sede) => sede.congregacaos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "SEDE_ID", referencedColumnName: "id" }])
  sede: Sede;

  @OneToMany(() => Evento, (evento) => evento.congregacao)
  eventos: Evento[];

  @OneToMany(() => Grupo, (grupo) => grupo.congregacao)
  grupos: Grupo[];

  @OneToMany(() => Membro, (membro) => membro.congregacao)
  membros: Membro[];
}
  
