import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Membro } from "src/models/membros.entity";
import { Evento } from "./evento.entity"; 

@Index("EVENTO_ID", ["eventoId"],  {})
@Entity("frequenta", { schema: "heavenpath" })
export class Frequenta {
  @Column("int", { primary: true, name: "MEMBRO_ID" })
  membroId: number;

  @Column("int", { primary: true, name: "EVENTO_ID" })
  eventoId: number;

  @Column("timestamp", { name: "DATA_HORA" })
  dataHora: Date;

  @ManyToOne(() => Membro, (membro) => membro.frequentas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "MEMBRO_ID", referencedColumnName: "id" }])
  membro: Membro;

  @ManyToOne(() => Evento, (evento) => evento.frequentas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "EVENTO_ID", referencedColumnName: "id" }])
  evento: Evento;
}
