import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { CreateTeamMemberService } from './create-team-member.service';

describe('CreateTeamMemberService', () => {
  let service: CreateTeamMemberService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTeamMemberService,
        {
          provide: TeamMembersRepository,
          useValue: {
            create: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTeamMemberService>(CreateTeamMemberService);
    repository = module.get(TeamMembersRepository);
  });

  it('should be able to create a new team member', async () => {
    const body = { name: 'John Doe', function: 'Developer' };
    const created = { id: 'any-uuid', ...body };

    repository.findByName.mockResolvedValue(null);
    repository.create.mockResolvedValue(created);

    const result = await service.create(body);

    expect(repository.findByName).toHaveBeenCalledTimes(1);
    expect(repository.findByName).toHaveBeenCalledWith(body.name);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(body);
    expect(result).toEqual(created);
  });

  it('should not be able to create a team member with a duplicate name', async () => {
    const body = { name: 'Existing Member', function: 'Designer' };

    repository.findByName.mockResolvedValue({ id: 'existing-id', ...body });

    const promise = service.create(body);

    await expect(promise).rejects.toBeInstanceOf(AppError);
    await expect(promise).rejects.toMatchObject({
      message: 'A team member with this name already exists.',
    });

    expect(repository.create).not.toHaveBeenCalled();
  });
});
