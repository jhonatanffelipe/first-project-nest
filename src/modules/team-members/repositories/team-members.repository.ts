import { DefaultFiltersDto } from '../../../common/dtos/default-filters.dto';
import { PaginationResponseDto } from '../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateTeamMemberResponse } from '../dtos/create-team-member-response.dto';

export abstract class TeamMembersRepository {
  abstract create(data: {
    name: string;
    function: string;
  }): Promise<CreateTeamMemberResponse>;
  abstract findByName(name: string): Promise<CreateTeamMemberResponse | null>;
  abstract findAll(
    pagination: PaginationDto,
    filter: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<CreateTeamMemberResponse>>;
  abstract findById(id: string): Promise<CreateTeamMemberResponse | null>;
}
