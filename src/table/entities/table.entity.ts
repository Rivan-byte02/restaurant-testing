import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Unique identifier for the table, e.g., Table-1

  @Column('int')
  capacity: number; // Maximum number of people the table can accommodate

  @Column({ default: true })
  isAvailable: boolean; // Flag to track table availability
}
