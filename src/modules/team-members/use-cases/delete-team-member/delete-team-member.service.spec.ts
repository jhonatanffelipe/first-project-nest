import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { DeleteTeamMemberService } from './delete-team-member.service';

describe('DeleteTeamMemberService', () => {
  let service: DeleteTeamMemberService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTeamMemberService,
        {
          provide: TeamMembersRepository,
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteTeamMemberService>(DeleteTeamMemberService);
    repository = module.get(TeamMembersRepository);
  });

  it('should be able to delete a team member', async () => {
    const member = { id: 'any-id', name: 'John Doe', function: 'Dev' };
    repository.findById.mockResolvedValue(member);
    repository.delete.mockResolvedValue(member);

    const result = await service.delete('any-id');

    expect(repository.findById).toHaveBeenCalledWith('any-id');
    expect(repository.delete).toHaveBeenCalledWith('any-id');
    expect(result).toEqual(member);
  });

  it('should throw error if team member does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    try {
      await service.delete('invalid-id');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe('Team member not found.');
      expect((error as AppError).getStatus()).toBe(404);
    }
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
