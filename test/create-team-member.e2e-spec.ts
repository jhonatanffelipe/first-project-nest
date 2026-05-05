import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
const request = supertest.default || supertest;
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('Create Team Member (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.teamMember.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.teamMember.deleteMany();
  });

  it('/team-members (POST) - should create a team member', async () => {
    const body = {
      name: 'Integration Test Member',
      function: 'Software Engineer',
    };

    const response = await request(app.getHttpServer())
      .post('/team-members')
      .send(body)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: body.name,
      function: body.function,
    });

    const memberInDb = await prisma.teamMember.findFirst({
      where: { name: body.name },
    });
    expect(memberInDb).toBeTruthy();
  });

  it('/team-members (POST) - should not create a team member with duplicate name', async () => {
    const body = {
      name: 'Duplicate Member',
      function: 'Designer',
    };

    // Criar o primeiro
    await request(app.getHttpServer())
      .post('/team-members')
      .send(body)
      .expect(201);

    // Tentar criar o segundo com mesmo nome
    const response = await request(app.getHttpServer())
      .post('/team-members')
      .send(body)
      .expect(500); // AppError padrão cai no filtro de exceção

    expect(response.body.message).toBe('A team member with this name already exists.');
  });

  it('/team-members (POST) - should validate request body', async () => {
    const invalidBody = {
      name: '', // Nome vazio (dependendo da validação no DTO)
    };

    await request(app.getHttpServer())
      .post('/team-members')
      .send(invalidBody)
      .expect(400);
  });
});
