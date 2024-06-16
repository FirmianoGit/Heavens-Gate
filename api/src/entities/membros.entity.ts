import { Frequenta } from "./frequenta.entity";
import { Usuario } from "src/entities/usuario.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Historico } from "./historico.entity";
import { Congregacao } from "./congregacao.entity";
import { Grupo } from "src/entities/grupo.entity";

@Index("IDENTIDADE", ["identidade"], { unique: true })
@Index("CPF", ["cpf"], { unique: true })
@Index("CONGREGACAO_ID", ["congregacaoId"], {})
@Index("ID", ["id"], {})
@Entity("membro", { schema: "heavenpath" })
export class Membro {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "NOME", length: 60 })
  nome: string;

  @Column("varchar", { name: "NATURALIDADE", length: 20 })
  naturalidade: string;

  @Column("varchar", { name: "IDENTIDADE", unique: true, length: 15 })
  identidade: string;

  @Column("varchar", { name: "ESTADO_CIVIL", length: 15 })
  estadoCivil: string;

  @Column("varchar", { name: "CPF", unique: true, length: 15 })
  cpf: string;

  @Column("varchar", { name: "PROFISSAO", nullable: true, length: 30 })
  profissao: string | null;

  @Column("varchar", { name: "OCUPACAO", nullable: true, length: 30 })
  ocupacao: string | null;

  @Column("varchar", { name: "REF", nullable: true, length: 30 })
  ref: string | null;

  @Column("varchar", { name: "NOME_PAI", nullable: true, length: 60 })
  nomePai: string | null;

  @Column("varchar", { name: "NOME_MAE", nullable: true, length: 60 })
  nomeMae: string | null;

  @Column("varchar", { name: "NOME_CONJUGE", nullable: true, length: 60 })
  nomeConjuge: string | null;

  @Column("date", { name: "DATA_CONVERSAO", nullable: true })
  dataConversao: string | null;

  @Column("date", { name: "DATA_NASCIMENTO", nullable: true })
  dataNascimento: string | null;

  @Column("date", { name: "DATA_BATISMO", nullable: true })
  dataBatismo: string | null;

  @Column("date", { name: "DATA_BATISMO_ESP_SANTO", nullable: true })
  dataBatismoEspSanto: string | null;

  @Column("date", { name: "DATA_ADMISSAO", nullable: true })
  dataAdmissao: string | null;

  @Column("date", { name: "DATA_CANCELAMENTO", nullable: true })
  dataCancelamento: string | null;

  @Column("date", { name: "DATA_READMISSAO", nullable: true })
  dataReadmissao: string | null;

  @Column("varchar", { name: "LUGAR_CONGREGA", nullable: true, length: 40 })
  lugarCongrega: string | null;

  @Column("varchar", {
    name: "CLASSE_ESC_DOMINICAL",
    nullable: true,
    length: 40,
  })
  classeEscDominical: string | null;

  @Column("varchar", { name: "RUA", nullable: true, length: 60 })
  rua: string | null;

  @Column("varchar", { name: "BAIRRO", nullable: true, length: 30 })
  bairro: string | null;

  @Column("int", { name: "NUMERO", nullable: true })
  numero: number | null;

  @Column("varchar", { name: "COMPLEMENTO", nullable: true, length: 30 })
  complemento: string | null;

  @Column("varchar", { name: "PROCEDENCIA", nullable: true, length: 45 })
  procedencia: string | null;

  @Column("varchar", { name: "MOTIVO_DESTINO", nullable: true, length: 60 })
  motivoDestino: string | null;

  @Column("varchar", { name: "LUGAR_CONVERSAO", nullable: true, length: 60 })
  lugarConversao: string | null;

  @Column("varchar", { name: "LUGAR_BATISMO", nullable: true, length: 60 })
  lugarBatismo: string | null;

  @Column("varchar", {
    name: "LUGAR_BATISMO_ESP_SANTO",
    nullable: true,
    length: 60,
  })
  lugarBatismoEspSanto: string | null;

  @Column("varchar", {
    name: "ATIVIDADES_NA_IGREJA",
    nullable: true,
    length: 99,
  })
  atividadesNaIgreja: string | null;

  @Column("int", { name: "CONGREGACAO_ID", nullable: true })
  congregacaoId: number | null;

  @OneToMany(() => Frequenta, (frequenta) => frequenta.membro)
  frequentas: Frequenta[];

  @OneToMany(() => Historico, (historico) => historico.membro)
  historicos: Historico[];

  @ManyToOne(() => Congregacao, (congregacao) => congregacao.membros, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "CONGREGACAO_ID", referencedColumnName: "id" }])
  congregacao: Congregacao;

  @ManyToOne(() => Usuario, (usuario) => usuario.membros, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID", referencedColumnName: "id" }])
  usuario: Usuario;

  @ManyToMany(() => Grupo, (grupo) => grupo.membros)
  @JoinTable({
    name: "participa",
    joinColumns: [{ name: "MEMBRO_ID", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "GRUPO_ID", referencedColumnName: "id" }],
    schema: "heavenpath",
  })
  grupos: Grupo[];
}