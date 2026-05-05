import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('Update Team Member (e2e)', () => {
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

  it('/team-members/:id (PUT) - should update name and function', async () => {
    const created = await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Original Name',
        function: 'Original Function',
      },
    });

    const response = await request(app.getHttpServer())
      .put(`/team-members/${created.id}`)
      .send({ name: 'Updated Name', function: 'Updated Function' })
      .expect(200);

    expect(response.body).toMatchObject({
      id: created.id,
      name: 'Updated Name',
      function: 'Updated Function',
    });

    const memberInDb = await prisma.teamMember.findUnique({
      where: { id: created.id },
    });
    expect(memberInDb?.name).toBe('Updated Name');
    expect(memberInDb?.function).toBe('Updated Function');
  });

  it('/team-members/:id (PUT) - should update only the name', async () => {
    const created = await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Original Name',
        function: 'Kept Function',
      },
    });

    const response = await request(app.getHttpServer())
      .put(`/team-members/${created.id}`)
      .send({ name: 'New Name Only' })
      .expect(200);

    expect(response.body).toMatchObject({
      id: created.id,
      name: 'New Name Only',
      function: 'Kept Function',
    });
  });

  it('/team-members/:id (PUT) - should not update to a duplicate name', async () => {
    await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Existing Member',
        function: 'Dev',
      },
    });

    const target = await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Target Member',
        function: 'QA',
      },
    });

    const response = await request(app.getHttpServer())
      .put(`/team-members/${target.id}`)
      .send({ name: 'Existing Member' })
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect((response.body as { message: string }).message).toBe(
      'A team member with this name already exists.',
    );
  });

  it('/team-members/:id (PUT) - should return 404 when member does not exist', async () => {
    const nonExistentId = crypto.randomUUID();

    const response = await request(app.getHttpServer())
      .put(`/team-members/${nonExistentId}`)
      .send({ name: 'Ghost Member' })
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect((response.body as { message: string }).message).toBe(
      'Team member not found.',
    );
  });

  it('/team-members/:id (PUT) - should reject name shorter than 3 characters', async () => {
    const created = await prisma.teamMember.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Valid Name',
        function: 'Dev',
      },
    });

    await request(app.getHttpServer())
      .put(`/team-members/${created.id}`)
      .send({ name: 'AB' })
      .expect(400);
  });
});
