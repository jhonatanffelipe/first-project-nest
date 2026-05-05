import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('Find Team Member By Id (e2e)', () => {
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

  it('/team-members/:id (GET) - should return a team member by id', async () => {
    const created = await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Find Me Member',
        function: 'Backend Dev',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/team-members/${created.id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: created.id,
      name: created.name,
      function: created.function,
    });
  });

  it('/team-members/:id (GET) - should return 404 when member does not exist', async () => {
    const nonExistentId = crypto.randomUUID();

    const response = await request(app.getHttpServer())
      .get(`/team-members/${nonExistentId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect((response.body as { message: string }).message).toBe(
      'Team member not found.',
    );
  });
});
