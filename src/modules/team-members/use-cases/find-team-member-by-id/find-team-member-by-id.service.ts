import { Injectable } from '@nestjs/common';
import { AppError } from '../../../../common/errors/app.error';
import { CreateTeamMemberResponse } from '../../dtos/create-team-member-response.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class FindTeamMemberByIdService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async findById(id: string): Promise<CreateTeamMemberResponse> {
    const teamMember = await this.teamMembersRepository.findById(id);

    if (!teamMember) {
      throw new AppError('Team member not found.', 404);
    }

    return teamMember;
  }
}
