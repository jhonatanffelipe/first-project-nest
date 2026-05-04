import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { DeleteTeamMemberService } from './delete-team-member.service';

@ApiTags('team-members')
@Controller('team-members')
export class DeleteTeamMemberController {
  constructor(private deleteTeamMemberService: DeleteTeamMemberService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TeamMemberResponse,
    description: 'Team member deleted successfully',
  })
  public async delete(@Param('id') id: string): Promise<TeamMemberResponse> {
    return await this.deleteTeamMemberService.delete(id);
  }
}
