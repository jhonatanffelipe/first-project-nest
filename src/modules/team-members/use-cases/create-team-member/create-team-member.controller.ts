import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamMemberBody } from '../../dtos/create-team-member-body.dto';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { CreateTeamMemberService } from './create-team-member.service';

@ApiTags('team-members')
@Controller('team-members')
export class CreateTeamMemberController {
  constructor(private createTeamMemberService: CreateTeamMemberService) {}

  @Post()
  @ApiCreatedResponse({
    type: TeamMemberResponse,
    description: 'Team member created successfully',
  })
  public async createTeamMember(
    @Body() body: CreateTeamMemberBody,
  ): Promise<TeamMemberResponse> {
    const { name, function: memberFunction } = body;

    const teamMember = await this.createTeamMemberService.create({
      name,
      function: memberFunction,
    });

    return teamMember;
  }
}
