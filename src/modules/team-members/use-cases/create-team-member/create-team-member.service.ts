import { Injectable } from '@nestjs/common';
import { AppError } from '../../../../common/errors/app.error';
import { CreateTeamMemberBody } from '../../dtos/create-team-member-body.dto';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class CreateTeamMemberService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async create({
    name,
    function: memberFunction,
  }: CreateTeamMemberBody): Promise<TeamMemberResponse> {
    const existingTeamMember =
      await this.teamMembersRepository.findByName(name);

    if (existingTeamMember) {
      throw new AppError('A team member with this name already exists.');
    }

    const teamMember = await this.teamMembersRepository.create({
      name,
      function: memberFunction,
    });

    return teamMember;
  }
}
