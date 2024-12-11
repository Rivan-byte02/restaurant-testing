import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reservations (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        customerId: 1,
        tableId: 1,
        reservationDate: '2024-12-10',
        startTime: '21:00',
        endTime: '22:00',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('/reservations (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/reservations')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
