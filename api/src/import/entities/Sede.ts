import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Congregacao } from "./Congregacao";
import { Gestor } from "./Gestor";

@Index("CNPJ", ["cnpj"], { unique: true })
@Index("GESTOR_ID", ["gestorId"], {})
@Entity("sede", { schema: "heavenpath" })
export class Sede {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "CNPJ", nullable: true, unique: true, length: 20 })
  cnpj: string | null;

  @Column("varchar", { name: "NOME", length: 60 })
  nome: string;

  @Column("varchar", { name: "RUA", nullable: true, length: 60 })
  rua: string | null;

  @Column("varchar", { name: "BAIRRO", nullable: true, length: 30 })
  bairro: string | null;

  @Column("int", { name: "NUMERO", nullable: true })
  numero: number | null;

  @Column("varchar", { name: "COMPLEMENTO", nullable: true, length: 30 })
  complemento: string | null;

  @Column("int", { name: "TELEFONE", nullable: true })
  telefone: number | null;

  @Column("int", { name: "GESTOR_ID", nullable: true })
  gestorId: number | null;

  @OneToMany(() => Congregacao, (congregacao) => congregacao.sede)
  congregacaos: Congregacao[];

  @ManyToOne(() => Gestor, (gestor) => gestor.sedes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "GESTOR_ID", referencedColumnName: "id" }])
  gestor: Gestor;
}
