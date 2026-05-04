import { DefaultFiltersDto } from '../../../common/dtos/default-filters.dto';
import { PaginationResponseDto } from '../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { TeamMemberResponse } from '../dtos/team-member-response.dto';

export abstract class TeamMembersRepository {
  abstract create(data: {
    name: string;
    function: string;
  }): Promise<TeamMemberResponse>;
  abstract findByName(name: string): Promise<TeamMemberResponse | null>;
  abstract findAll(
    pagination: PaginationDto,
    filter: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<TeamMemberResponse>>;
  abstract findById(id: string): Promise<TeamMemberResponse | null>;
  abstract update(
    id: string,
    data: { name?: string; function?: string },
  ): Promise<TeamMemberResponse>;
  abstract delete(id: string): Promise<TeamMemberResponse>;
}
