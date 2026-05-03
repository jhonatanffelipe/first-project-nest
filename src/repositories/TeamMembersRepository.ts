import { CreateTeamMemberResponse } from '../dtos/CreateTeamMemberResponse';

export abstract class TeamMembersRepository {
  abstract create(data: {
    name: string;
    function: string;
  }): Promise<CreateTeamMemberResponse>;
}
