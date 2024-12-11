import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { Table } from '../table/entities/table.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MailchimpService } from '../mailchimp/mailchimp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Table, Customer])],
  controllers: [ReservationController],
  providers: [ReservationService, MailchimpService],
})
export class ReservationModule {}
