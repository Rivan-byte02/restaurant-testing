import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Table } from '../table/entities/table.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MailchimpService } from '../mailchimp/mailchimp.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly mailchimpService: MailchimpService,
  ) {}

  async createReservation(data: {
    customerId: number;
    tableId: number;
    reservationDate: string;
    startTime: string;
    endTime: string;
  }): Promise<Reservation> {
    const { customerId, tableId, reservationDate, startTime, endTime } = data;

    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new BadRequestException('Invalid customer ID');
    }

    const table = await this.tableRepository.findOne({ where: { id: tableId } });
    if (!table || !table.isAvailable) {
      throw new BadRequestException('Invalid or unavailable table ID');
    }

    // Check for overlapping reservations
    const overlappingReservations = await this.reservationRepository.find({
      where: {
        table: table,
        reservationDate: reservationDate,
        startTime: startTime,
        endTime: endTime,
      },
    });

    if (overlappingReservations.length > 0) {
      throw new BadRequestException('Table is already booked for the selected time slot');
    }

    // Validate restaurant hours (e.g., open 10:00 - 22:00)
    const openingTime = '10:00';
    const closingTime = '22:00';
    if (startTime < openingTime || endTime > closingTime) {
      throw new BadRequestException('Reservations can only be made during restaurant open hours');
    }

    const reservation = this.reservationRepository.create({
      customer,
      table,
      reservationDate,
      startTime,
      endTime,
    });

    const savedReservation = await this.reservationRepository.save(reservation);

    // Send confirmation email using Mailchimp
    const emailBody = `
      <h1>Reservation Confirmed</h1>
      <p>Dear ${customer.firstName} ${customer.lastName},</p>
      <p>Your reservation at our restaurant is confirmed:</p>
      <ul>
        <li><strong>Table:</strong> ${table.name}</li>
        <li><strong>Date:</strong> ${reservationDate}</li>
        <li><strong>Time:</strong> ${startTime} to ${endTime}</li>
      </ul>
      <p>Thank you for choosing our restaurant!</p>
    `;
    await this.mailchimpService.sendEmail(customer.email, 'Reservation Confirmed', emailBody);

    return savedReservation;
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['customer', 'table'],
    });
  }
}
