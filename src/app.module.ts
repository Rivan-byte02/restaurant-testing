import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { TableModule } from './table/table.module';
import { ReservationModule } from './reservation/reservation.module';
import { MailchimpService } from './mailchimp/mailchimp.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'restaurant',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomerModule,
    TableModule,
    ReservationModule,
  ],
  providers: [MailchimpService],
})
export class AppModule {}
