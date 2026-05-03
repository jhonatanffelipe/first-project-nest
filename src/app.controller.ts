import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamMemberBody } from './dtos/CreateTeamMemberBody';
import { CreateTeamMemberResponse } from './dtos/CreateTeamMemberResponse';
import { TeamMembersRepository } from './repositories/TeamMembersRepository';

@Controller('team-members')
export class AppController {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  @Post()
  async createTeamMember(
    @Body() body: CreateTeamMemberBody,
  ): Promise<CreateTeamMemberResponse> {
    const { name, function: memberFunction } = body;

    const teamMember = await this.teamMembersRepository.create({
      name,
      function: memberFunction,
    });

    return teamMember;
  }
}
