import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { UpdateTeamMemberBody } from '../../dtos/update-team-member-body.dto';
import { UpdateTeamMemberService } from './update-team-member.service';

@ApiTags('team-members')
@Controller('team-members')
export class UpdateTeamMemberController {
  constructor(private updateTeamMemberService: UpdateTeamMemberService) {}

  @Put(':id')
  @ApiOkResponse({
    type: TeamMemberResponse,
    description: 'Team member updated successfully',
  })
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateTeamMemberBody,
  ): Promise<TeamMemberResponse> {
    return await this.updateTeamMemberService.update(id, body);
  }
}
