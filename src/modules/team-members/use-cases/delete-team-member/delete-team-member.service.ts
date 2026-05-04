import { Injectable } from '@nestjs/common';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class DeleteTeamMemberService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async delete(id: string): Promise<TeamMemberResponse> {
    const existingMember = await this.teamMembersRepository.findById(id);

    if (!existingMember) {
      throw new AppError('Team member not found.', 404);
    }

    return await this.teamMembersRepository.delete(id);
  }
}
