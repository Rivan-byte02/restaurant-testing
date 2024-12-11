import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let createdCustomerId: number; // Variable to store the created customer's ID

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/customers (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdCustomerId = response.body.id; // Store the created customer's ID
  });

  it('/customers/:id (PUT)', async () => {
    const updatedData = { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' };
    const response = await request(app.getHttpServer())
      .put(`/customers/${createdCustomerId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCustomerId);
    expect(response.body).toMatchObject(updatedData); // Check that the response matches the updated data
  });

  it('/customers (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/customers')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('/customers/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/customers/${createdCustomerId}`)
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Customer deleted successfully');
  });

  afterAll(async () => {
    await app.close();
  });
});
