import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { FindTeamMemberByIdService } from './find-team-member-by-id.service';

describe('FindTeamMemberByIdService', () => {
  let service: FindTeamMemberByIdService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTeamMemberByIdService,
        {
          provide: TeamMembersRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindTeamMemberByIdService>(FindTeamMemberByIdService);
    repository = module.get(TeamMembersRepository);
  });

  it('should be able to find a team member by id', async () => {
    const member = { id: 'any-id', name: 'John Doe', function: 'Dev' };
    repository.findById.mockResolvedValue(member);

    const result = await service.findById('any-id');

    expect(repository.findById).toHaveBeenCalledWith('any-id');
    expect(result).toEqual(member);
  });

  it('should throw error if team member is not found', async () => {
    repository.findById.mockResolvedValue(null);

    try {
      await service.findById('invalid-id');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('Team member not found.');
      expect((error as AppError).getStatus()).toBe(404);
    }
  });
});
