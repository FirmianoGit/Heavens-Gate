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
import { Usuario } from "./Usuario";
import { Sede } from "./Sede";

@Index("CPF", ["cpf"], { unique: true })
@Index("USUARIO_ID", ["usuarioId"], {})
@Entity("gestor", { schema: "heavenpath" })
export class Gestor {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "NOME", length: 45 })
  nome: string;

  @Column("varchar", { name: "CPF", unique: true, length: 15 })
  cpf: string;

  @Column("int", { name: "USUARIO_ID", nullable: true })
  usuarioId: number | null;

  @OneToMany(() => Congregacao, (congregacao) => congregacao.gestor)
  congregacaos: Congregacao[];

  @ManyToOne(() => Usuario, (usuario) => usuario.gestors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "USUARIO_ID", referencedColumnName: "id" }])
  usuario: Usuario;

  @OneToMany(() => Sede, (sede) => sede.gestor)
  sedes: Sede[];
}
