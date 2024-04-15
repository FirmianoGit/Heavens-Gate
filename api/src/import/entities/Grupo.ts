import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Congregacao } from "./Congregacao";
import { Membro } from "./Membro";

@Index("CONGREGACAO_ID", ["congregacaoId"], {})
@Entity("grupo", { schema: "heavenpath" })
export class Grupo {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "DESCRICAO", length: 99 })
  descricao: string;

  @Column("int", { name: "CONGREGACAO_ID", nullable: true })
  congregacaoId: number | null;

  @ManyToOne(() => Congregacao, (congregacao) => congregacao.grupos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "CONGREGACAO_ID", referencedColumnName: "id" }])
  congregacao: Congregacao;

  @ManyToMany(() => Membro, (membro) => membro.grupos)
  membros: Membro[];
}
