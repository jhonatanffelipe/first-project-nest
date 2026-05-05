import { Injectable } from '@nestjs/common';
import { DefaultFiltersDto } from '../../../../common/dtos/default-filters.dto';
import { PaginationResponseDto } from '../../../../common/dtos/pagination-response.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { TeamMemberResponse } from '../../dtos/team-member-response.dto';
import { TeamMembersRepository } from '../../repositories/team-members.repository';

@Injectable()
export class FindAllTeamMembersService {
  constructor(private teamMembersRepository: TeamMembersRepository) {}

  public async findAll(
    { limit, page, sortBy, sortOrder }: PaginationDto,
    { filterField, filterValue }: DefaultFiltersDto,
  ): Promise<PaginationResponseDto<TeamMemberResponse>> {
    return await this.teamMembersRepository.findAll(
      {
        limit: limit ?? 10,
        page: page ?? 1,
        sortBy: sortBy ?? 'name',
        sortOrder: sortOrder ?? 'asc',
      },
      { filterField, filterValue },
    );
  }
}
