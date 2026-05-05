import { AppError } from '../../../../common/errors/app.error';
import { TeamMembersRepository } from '../../repositories/team-members.repository';
import { CreateTeamMemberService } from './create-team-member.service';

describe('CreateTeamMemberService', () => {
  let service: CreateTeamMemberService;
  let repository: jest.Mocked<TeamMembersRepository>;

  beforeEach(() => {
    // Criando um mock manual da classe abstrata
    repository = {
      create: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TeamMembersRepository>;

    service = new CreateTeamMemberService(repository);
  });

  it('should be able to create a new team member', async () => {
    const memberData = {
      name: 'John Doe',
      function: 'Developer',
    };

    const mockCreatedMember = {
      id: 'any-id',
      ...memberData,
    };

    repository.findByName.mockResolvedValue(null);
    repository.create.mockResolvedValue(mockCreatedMember);

    const result = await service.create(memberData);

    expect(repository.findByName).toHaveBeenCalledWith(memberData.name);
    expect(repository.create).toHaveBeenCalledWith(memberData);
    expect(result).toEqual(mockCreatedMember);
  });

  it('should not be able to create a team member with a name that already exists', async () => {
    const memberData = {
      name: 'Existing Member',
      function: 'Designer',
    };

    repository.findByName.mockResolvedValue({
      id: 'existing-id',
      ...memberData,
    });

    await expect(service.create(memberData)).rejects.toBeInstanceOf(AppError);
    
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should throw AppError with correct message when name exists', async () => {
    const memberData = {
      name: 'Existing Member',
      function: 'Designer',
    };

    repository.findByName.mockResolvedValue({
      id: 'existing-id',
      ...memberData,
    });

    try {
      await service.create(memberData);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('A team member with this name already exists.');
    }
  });
});
