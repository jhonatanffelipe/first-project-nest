import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { FindTeamMemberByIdService } from './find-team-member-by-id.service';

@ApiTags('team-members')
@Controller('team-members')
export class FindTeamMemberByIdController {
  constructor(private findTeamMemberByIdService: FindTeamMemberByIdService) {}

  @Get(':id')
  @ApiOkResponse({
    type: TeamMemberResponse,
    description: 'Team member retrieved successfully',
  })
  public async findById(@Param('id') id: string): Promise<TeamMemberResponse> {
    return await this.findTeamMemberByIdService.findById(id);
  }
}
