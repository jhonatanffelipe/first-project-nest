import { Test, TestingModule } from '@nestjs/testing';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { FindAllTeamMembersService } from './find-all-team-members.service';

describe('FindAllTeamMembersService', () => {
  let service: FindAllTeamMembersService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTeamMembersService,
        {
          provide: TeamMembersRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAllTeamMembersService>(FindAllTeamMembersService);
    repository = module.get(TeamMembersRepository);
  });

  it('should be able to list all team members', async () => {
    const pagination = {
      page: 1,
      limit: 10,
      sortBy: 'name',
      sortOrder: 'asc' as `asc` | `desc`,
    };
    const filter = { filterField: 'name', filterValue: 'John' };
    const mockResponse = {
      data: [{ id: '1', name: 'John Doe', function: 'Dev' }],
      total: 1,
      page: 1,
      limit: 10,
    };

    repository.findAll.mockResolvedValue(mockResponse);

    const result = await service.findAll(pagination, filter);

    expect(repository.findAll).toHaveBeenCalledWith(pagination, filter);
    expect(result).toEqual(mockResponse);
  });
});
