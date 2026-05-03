import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamMemberBody } from './dtos/create-team-member-body.dto';
import { CreateTeamMemberResponse } from './dtos/create-team-member-response.dto';
import { TeamMembersService } from './team-members.service';

@ApiTags('team-members')
@Controller('team-members')
export class TeamMembersController {
  constructor(private teamMembersService: TeamMembersService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateTeamMemberResponse,
    description: 'Team member created successfully',
  })
  async createTeamMember(
    @Body() body: CreateTeamMemberBody,
  ): Promise<CreateTeamMemberResponse> {
    const { name, function: memberFunction } = body;

    const teamMember = await this.teamMembersService.create({
      name,
      function: memberFunction,
    });

    return teamMember;
  }
}
