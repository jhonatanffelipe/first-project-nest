import { CreateTeamMemberResponse } from '../dtos/create-team-member-response.dto';

export abstract class TeamMembersRepository {
  abstract create(data: {
    name: string;
    function: string;
  }): Promise<CreateTeamMemberResponse>;

  abstract findByName(name: string): Promise<CreateTeamMemberResponse | null>;
}
