import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('Find All Team Members (e2e)', () => {
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

  it('/team-members (GET) - should return paginated list of team members', async () => {
    await prisma.teamMember.createMany({
      data: [
        { id: crypto.randomUUID(), name: 'Alice', function: 'Dev' },
        { id: crypto.randomUUID(), name: 'Bob', function: 'QA' },
        { id: crypto.randomUUID(), name: 'Carol', function: 'Designer' },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/team-members')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(response.body).toMatchObject({
      data: expect.any(Array),
      total: 3,
      page: 1,
      limit: 10,
    });
    expect((response.body as { data: unknown[] }).data).toHaveLength(3);
  });

  it('/team-members (GET) - should respect pagination params', async () => {
    await prisma.teamMember.createMany({
      data: [
        { id: crypto.randomUUID(), name: 'Alice', function: 'Dev' },
        { id: crypto.randomUUID(), name: 'Bob', function: 'QA' },
        { id: crypto.randomUUID(), name: 'Carol', function: 'Designer' },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/team-members')
      .query({ page: 1, limit: 2 })
      .expect(200);

    expect(response.body).toMatchObject({
      total: 3,
      page: 1,
      limit: 2,
    });
    expect((response.body as { data: unknown[] }).data).toHaveLength(2);
  });

  it('/team-members (GET) - should filter by field and value', async () => {
    await prisma.teamMember.createMany({
      data: [
        { id: crypto.randomUUID(), name: 'Alice', function: 'Dev' },
        { id: crypto.randomUUID(), name: 'Bob', function: 'QA' },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/team-members')
      .query({ filterField: 'name', filterValue: 'Alice' })
      .expect(200);

    expect((response.body as { data: unknown[] }).data).toHaveLength(1);
    expect((response.body as { data: unknown[] }).data[0]).toMatchObject({
      name: 'Alice',
    });
  });

  it('/team-members (GET) - should return empty list when no members exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/team-members')
      .expect(200);

    expect(response.body).toMatchObject({ data: [], total: 0 });
  });

  it('/team-members (GET) - should reject invalid pagination params', async () => {
    await request(app.getHttpServer())
      .get('/team-members')
      .query({ limit: 0 })
      .expect(400);
  });
});
