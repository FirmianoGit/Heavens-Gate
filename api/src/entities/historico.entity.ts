import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Membro } from "./membros.entity";
  //import { Membro } from "./Membro";
  
  @Index("MEMBRO_ID", ["membroId"], {})
  @Entity("historico", { schema: "heavenpath" })
  export class Historico {
    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;
  
    @Column("varchar", { name: "DESCRICAO", length: 45 })
    descricao: string;
  
    @Column("timestamp", { name: "DATA_HORA", nullable: true })
    dataHora: Date | null;
  
    @Column("int", { name: "MEMBRO_ID", nullable: true })
    membroId: number | null;
  
    @ManyToOne(() => Membro, (membro) => membro.historicos, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "MEMBRO_ID", referencedColumnName: "id" }])
    membro: Membro;
  }
  