import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('TableController (e2e)', () => {
  let app: INestApplication;
  let createdTableId: number; // Variable to store the created table's ID

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tables (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/tables')
      .send({ name: 'Table-1', capacity: 4 })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdTableId = response.body.id; // Store the created table's ID
  });

  it('/tables/:id (PUT)', async () => {
    const updatedData = { name: 'Updated-Table-1', capacity: 6 };
    const response = await request(app.getHttpServer())
      .put(`/tables/${createdTableId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdTableId);
    expect(response.body).toMatchObject(updatedData); // Check that the response matches the updated data
  });

  it('/tables (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/tables')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('/tables/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tables/${createdTableId}`)
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Table deleted successfully');
  });

  afterAll(async () => {
    await app.close();
  });
});
