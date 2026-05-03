import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberResponse {
  @ApiProperty({ description: 'Unique identifier of the team member' })
  id: string;

  @ApiProperty({ description: 'Name of the team member' })
  name: string;

  @ApiProperty({ description: 'Function/role of the team member' })
  function: string;
}
