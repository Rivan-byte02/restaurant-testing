import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Table } from '../../table/entities/table.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, { nullable: false, onDelete: 'CASCADE' })
  customer: Customer;

  @ManyToOne(() => Table, { nullable: false, onDelete: 'CASCADE' })
  table: Table;

  @Column()
  reservationDate: string; // Format: YYYY-MM-DD

  @Column()
  startTime: string; // Format: HH:mm

  @Column()
  endTime: string; // Format: HH:mm
}
