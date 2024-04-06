import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Membros {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
} 