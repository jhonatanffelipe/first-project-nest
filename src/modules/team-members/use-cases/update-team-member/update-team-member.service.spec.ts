import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { UpdateTeamMemberService } from './update-team-member.service';

describe('UpdateTeamMemberService', () => {
  let service: UpdateTeamMemberService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTeamMemberService,
        {
          provide: TeamMembersRepository,
          useValue: {
            findById: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateTeamMemberService>(UpdateTeamMemberService);
    repository = module.get(TeamMembersRepository);
  });

  it('should be able to update a team member', async () => {
    const existing = { id: '1', name: 'Old Name', function: 'Dev' };
    const updateData = { name: 'New Name' };
    const updated = { ...existing, ...updateData };

    repository.findById.mockResolvedValue(existing);
    repository.findByName.mockResolvedValue(null);
    repository.update.mockResolvedValue(updated);

    const result = await service.update('1', updateData);

    expect(repository.findById).toHaveBeenCalledWith('1');
    expect(repository.findByName).toHaveBeenCalledWith('New Name');
    expect(repository.update).toHaveBeenCalledWith('1', updateData);
    expect(result).toEqual(updated);
  });

  it('should throw error if member does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    const promise = service.update('invalid', { name: 'New' });

    await expect(promise).rejects.toBeInstanceOf(AppError);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('should throw error if new name is already taken by another member', async () => {
    const existing = { id: '1', name: 'My Name', function: 'Dev' };
    const another = { id: '2', name: 'Taken Name', function: 'Dev' };

    repository.findById.mockResolvedValue(existing);
    repository.findByName.mockResolvedValue(another);

    const promise = service.update('1', { name: 'Taken Name' });

    await expect(promise).rejects.toBeInstanceOf(AppError);
    await expect(promise).rejects.toMatchObject({
      message: 'A team member with this name already exists.',
    });
  });

  it('should not check name availability if name is not being changed', async () => {
    const existing = { id: '1', name: 'My Name', function: 'Dev' };
    repository.findById.mockResolvedValue(existing);
    repository.update.mockResolvedValue(existing);

    await service.update('1', {
      function: 'New Function',
    });

    expect(repository.findByName).not.toHaveBeenCalled();
    expect(repository.update).toHaveBeenCalledWith('1', {
      function: 'New Function',
    });
  });
});
