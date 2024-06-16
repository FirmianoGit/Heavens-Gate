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
  import { Frequenta } from "./frequenta.entity";
  
  @Index("CONGREGACAO_ID", ["congregacaoId"], {})
  @Entity("evento", { schema: "heavenpath" })
  export class Evento {
    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;
  
    @Column("varchar", { name: "DESCRICAO", length: 99 })
    descricao: string;
  
    @Column("date", { name: "DATA_INICIO" })
    dataInicio: Date;
  
    @Column("date", { name: "DATA_FIM" })
    dataFim: Date;
  
    @Column("int", { name: "CONGREGACAO_ID", nullable: true })
    congregacaoId: number | null;
  
    @ManyToOne(() => Congregacao, (congregacao) => congregacao.eventos, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "CONGREGACAO_ID", referencedColumnName: "id" }])
    congregacao: Congregacao;
  
    @OneToMany(() => Frequenta, (frequenta) => frequenta.evento)
    frequentas: Frequenta[];
  }