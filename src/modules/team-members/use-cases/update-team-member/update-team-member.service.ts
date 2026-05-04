import { Injectable } from '@nestjs/common';
import { AppError } from '../../../../common/errors/app.error';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { UpdateTeamMemberBody } from '../../dtos/update-team-member-body.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class UpdateTeamMemberService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async update(
    id: string,
    data: UpdateTeamMemberBody,
  ): Promise<TeamMemberResponse> {
    const existingMember = await this.teamMembersRepository.findById(id);

    if (!existingMember) {
      throw new AppError('Team member not found.', 404);
    }

    if (data.name && data.name !== existingMember.name) {
      const memberWithSameName = await this.teamMembersRepository.findByName(
        data.name,
      );

      if (memberWithSameName) {
        throw new AppError('A team member with this name already exists.');
      }
    }

    return await this.teamMembersRepository.update(id, data);
  }
}
